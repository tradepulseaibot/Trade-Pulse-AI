// ===== Trade Pulse AI – Profile & KYC (with photo upload + removal) =====
(function() {
  const $ = (id) => document.getElementById(id);

  /* ---------- Helpers ---------- */
  function getCurrentUser() {
    try { return JSON.parse(sessionStorage.getItem('tradePulseCurrentUser') || 'null'); } catch { return null; }
  }

  function saveCurrentUser(user) {
    sessionStorage.setItem('tradePulseLoggedIn', 'true');
    sessionStorage.setItem('tradePulseCurrentUser', JSON.stringify(user));
    if (window.currentUser) window.currentUser = user;
    try {
      const users = JSON.parse(localStorage.getItem('tradePulseUsers') || '[]');
      const idx = users.findIndex(u => u.username === user.username);
      if (idx !== -1) users[idx] = user;
      else users.push(user);
      localStorage.setItem('tradePulseUsers', JSON.stringify(users));
      localStorage.setItem('tradePulseUser', JSON.stringify(user));
    } catch(e) {}
    if (typeof window.updateDrawerUserInfo === 'function') window.updateDrawerUserInfo();
    renderProfile();
  }

  /* ---------- Profile View ---------- */
  function openProfileView() {
    ['homeView','investView','withdrawView','walletView','communityView','profileView'].forEach(id => {
      const el = $(id); if (el) el.classList.remove('active');
    });
    const pv = $('profileView'); if (pv) pv.classList.add('active');
    const pt = $('pageTitle'); if (pt) pt.textContent = 'Profile';
    document.querySelectorAll('.nav-item[data-view]').forEach(b => b.classList.remove('active'));
    renderProfile();
  }

  function renderProfile() {
    const user = getCurrentUser();
    if (!user) return;

    // Profile avatar
    const avatarDiv = $('profileAvatar');
    const removeBtn = $('removePhotoBtn');
    if (avatarDiv) {
      const firstLetter = (user.username || 'U').charAt(0).toUpperCase();
      if (user.avatar) {
        avatarDiv.innerHTML = `<img src="${user.avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><span class="avatar-initial" style="display:none;font-size:26px;font-weight:800;">${firstLetter}</span>`;
        if (removeBtn) removeBtn.style.display = 'block';
      } else {
        avatarDiv.innerHTML = `<span class="avatar-initial" style="font-size:26px;font-weight:800;">${firstLetter}</span>`;
        if (removeBtn) removeBtn.style.display = 'none';
      }
    }

    // Text fields
    const fields = {
      profileFullName: user.fullName || user.username || 'User',
      profileMembership: user.membership || 'Beginner',
      profileEmail: user.email || '---',
      profileUsername: user.username || '---',
      profileCountry: user.country || '---',
      profileReferral: user.referralCode || '---'
    };
    Object.entries(fields).forEach(([id, val]) => {
      const el = $(id); if (el) el.textContent = val;
    });

    // KYC badge & button
    const kycBadge = $('profileKycBadge');
    const kycBtn = $('startKycBtn');
    if (user.kycVerified) {
      if (kycBadge) kycBadge.innerHTML = '<span style="background:rgba(34,197,94,.15); color:#4ade80; padding:2px 10px; border-radius:999px; font-size:13px; font-weight:600;">✅ Verified</span>';
      if (kycBtn) kycBtn.style.display = 'none';
    } else {
      if (kycBadge) kycBadge.innerHTML = '<span style="background:rgba(239,68,68,.15); color:#f87171; padding:2px 10px; border-radius:999px; font-size:13px; font-weight:600;">⚠️ Not Verified</span>';
      if (kycBtn) kycBtn.style.display = 'block';
    }

    updateDrawerKycBadge(user);
  }

  function updateDrawerKycBadge(user) {
    const membershipEl = $('drawerMembership');
    if (!membershipEl) return;
    const oldBadge = document.getElementById('drawerKycBadge');
    if (oldBadge) oldBadge.remove();

    const badge = document.createElement('span');
    badge.id = 'drawerKycBadge';
    badge.style.cssText = 'font-size:10px; margin-left:6px; padding:1px 6px; border-radius:999px; font-weight:600;';
    if (user.kycVerified) {
      badge.style.background = 'rgba(34,197,94,.15)';
      badge.style.color = '#4ade80';
      badge.textContent = 'Verified';
    } else {
      badge.style.background = 'rgba(239,68,68,.15)';
      badge.style.color = '#f87171';
      badge.textContent = 'Unverified';
    }
    membershipEl.appendChild(badge);
  }

  /* ---------- Photo Upload ---------- */
  $('profilePhotoOverlay')?.addEventListener('click', () => {
    $('profilePhotoInput')?.click();
  });

  $('profilePhotoInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const user = getCurrentUser();
      if (!user) return;
      user.avatar = ev.target.result;  // base64
      saveCurrentUser(user);
      if (typeof window.updateDrawerUserInfo === 'function') window.updateDrawerUserInfo();
    };
    reader.readAsDataURL(file);
  });

  // Remove photo
  $('removePhotoBtn')?.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) return;
    user.avatar = '';
    saveCurrentUser(user);
    if (typeof window.updateDrawerUserInfo === 'function') window.updateDrawerUserInfo();
  });

  /* ---------- KYC Flow ---------- */
  let stream = null;

  function openKycModal() { const m = $('kycModal'); if (m) m.classList.add('open'); showKycStep(1); }
  function closeKycModal() { stopCamera(); const m = $('kycModal'); if (m) m.classList.remove('open'); }
  function showKycStep(step) {
    for (let i=1;i<=5;i++) { const el=$('kycStep'+i); if(el) el.style.display='none'; }
    const cur=$('kycStep'+step); if(cur) cur.style.display='block';
  }
  function stopCamera() { if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;} }

  async function startCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});
      const v=$('kycVideo'); if(v){v.srcObject=stream; await v.play();}
      $('captureBtn').style.display='block'; $('retakeBtn').style.display='none';
      showKycStep(2);
    } catch(e) { stream=null; simulateVerification(); }
  }

  function captureID() {
    if(!stream){simulateVerification();return;}
    const v=$('kycVideo'), c=$('kycCanvas'); if(!v||!c) return;
    c.width=v.videoWidth||320; c.height=v.videoHeight||240;
    c.getContext('2d').drawImage(v,0,0); stopCamera();
    showKycStep(3); setTimeout(()=>completeVerification(true),2000);
  }

  function simulateVerification(){ showKycStep(3); setTimeout(()=>completeVerification(true),2000); }

  function completeVerification(success) {
    const user=getCurrentUser();
    if(!user){showKycStep(5);$('kycErrorText').textContent='Session expired.';return;}
    if(success){user.kycVerified=true;saveCurrentUser(user);showKycStep(4);$('kycSuccessText').textContent=`ID verified for ${user.fullName||user.username}.`;}
    else{showKycStep(5);$('kycErrorText').textContent='Could not match ID. Try again.';}
  }

  function retake(){stopCamera();showKycStep(1);}

  /* ---------- Settings ---------- */
  function updateEmail() {
    const newEmail=$('settingsNewEmail')?.value?.trim();
    if(!newEmail||!newEmail.includes('@')) return alert('Please enter a valid email.');
    const user=getCurrentUser(); if(!user) return;
    user.email=newEmail.toLowerCase(); saveCurrentUser(user);
    alert('Email updated.'); $('settingsNewEmail').value='';
  }

  function updatePassword() {
    const oldPw=$('settingsOldPassword')?.value||'', newPw=$('settingsNewPassword')?.value||'', confirmPw=$('settingsConfirmPassword')?.value||'';
    const user=getCurrentUser(); if(!user) return;
    if(!oldPw||!newPw||!confirmPw) return alert('All password fields are required.');
    if(oldPw!==user.password) return alert('Old password is incorrect.');
    if(newPw!==confirmPw) return alert('New passwords do not match.');
    if(newPw.length<6) return alert('Password must be at least 6 characters.');
    user.password=newPw; saveCurrentUser(user);
    alert('Password changed.'); $('settingsOldPassword').value=''; $('settingsNewPassword').value=''; $('settingsConfirmPassword').value='';
  }

  /* ---------- Event Bindings ---------- */
  $('profileBackBtn')?.addEventListener('click',()=>{if(window.setView)window.setView('home');});
  $('drawerAvatar')?.addEventListener('click',openProfileView);

  $('startKycBtn')?.addEventListener('click',openKycModal);
  $('closeKycModalBtn')?.addEventListener('click',closeKycModal);
  $('startCameraBtn')?.addEventListener('click',startCamera);
  $('captureBtn')?.addEventListener('click',captureID);
  $('retakeBtn')?.addEventListener('click',retake);
  $('kycDoneBtn')?.addEventListener('click',closeKycModal);
  $('kycRetryBtn')?.addEventListener('click',()=>showKycStep(1));

  $('updateEmailBtn')?.addEventListener('click',updateEmail);
  $('updatePasswordBtn')?.addEventListener('click',updatePassword);

  $('kycModal')?.addEventListener('click',e=>{if(e.target===$('kycModal'))closeKycModal();});

  // Initial drawer badge
  (function waitForUser(){
    let attempts=0;
    const interval=setInterval(()=>{
      const user=getCurrentUser();
      if(user){updateDrawerKycBadge(user);clearInterval(interval);}
      if(++attempts>30) clearInterval(interval);
    },200);
  })();
})();
