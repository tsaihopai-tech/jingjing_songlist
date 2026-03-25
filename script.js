const ARTISTS = [
  {
    id: 'jay',
    name: '周杰倫',
    englishName: 'Jay Chou',
    emoji: '🎸',
    color: '#f5c518',
    songs: ['楓','不該','晴天','蝸牛','七里香','彩虹','安靜','心跳','一路向北','告白氣球','等你下課','稻香','聽媽媽的話','我不配','青花瓷','煙花易冷','以父之名','龍捲風','夜曲','不能說的秘密','牛仔很忙','黑色幽默','說好的幸福呢','可愛女人','髮如雪']
  },
  {
    id: 'jj',
    name: '林俊傑',
    englishName: 'JJ Lin',
    emoji: '🎹',
    color: '#3498db',
    songs: ['江南','小酒窩','曹操','修煉愛情','醉赤壁','偉大的渺小','愛笑的眼睛','漂移','她說','不為誰而做的歌','輸了你贏了世界又如何','天黑黑','一千年以後','記得','豆漿油條','你與我','倖存者']
  },
  {
    id: 'xue',
    name: '薛之謙',
    englishName: 'Xue Zhiqian',
    emoji: '🎭',
    color: '#9b59b6',
    songs: ['演員','認真的雪','你還要我怎樣','浪漫主義','你給我聽好','醜八怪','我好像在哪見過你','方圓幾里','初學者','天外來物','骨子裡','别','牆']
  },
  {
    id: 'zs',
    name: '周深',
    englishName: 'Charlie Zhou',
    emoji: '🕊️',
    color: '#1abc9c',
    songs: ['有我','小美滿','不謂俠','願','情深誤','童話鎮','大魚','起風了','深海魚子醬','光亮','消愁','去年夏天']
  },
  {
    id: 'lrh',
    name: '李榮浩',
    englishName: 'Ronghao Li',
    emoji: '🎺',
    color: '#e67e22',
    songs: ['喜劇之王','李白','為你為我','年少有為','貝貝','不將就','老街','模特','我身邊','麻煩','夜深了你還不想睡']
  },
  {
    id: 'wsl',
    name: '汪蘇瀧',
    englishName: 'Wang Sulong',
    emoji: '🌹',
    color: '#e74c3c',
    songs: ['有點甜','願把我的眼睛給你','小情歌','不分手的戀愛','一萬個捨不得','有點甜','以後別做朋友','說散就散','喜歡你是我做過最好的事']
  },
  {
    id: 'gem',
    name: '鄧紫棋',
    englishName: 'G.E.M.',
    emoji: '💎',
    color: '#e91e63',
    songs: ['泡沫','光年之外','新的心跳','倒數','原來你什麼都不想要','多遠都要在一起','來自天堂的魔鬼','我的秘密','可以不可以','後來的我們']
  },
  {
    id: 'wjk',
    name: '王俊凱',
    englishName: 'Wang Junkai',
    emoji: '⭐',
    color: '#2196f3',
    songs: ['外衣','甜甜','我才不會','天地一起','三月裡的小雨','三三得玖','大夢想家','看你不放','清醒']
  },
  {
    id: 'luq',
    name: '陸琪',
    englishName: 'Lu Qi',
    emoji: '🎙️',
    color: '#607d8b',
    songs: ['自己','普通朋友','愛過頭','你的那麼愛我','超級傷心']
  },
  {
    id: 'zjl',
    name: '鄭鈞',
    englishName: 'Zheng Jun',
    emoji: '🎸',
    color: '#795548',
    songs: ['回到拉薩','私奔','灰姑娘','側臉','沙灘','天下沒有不散的筵席']
  },
  {
    id: 'lzs',
    name: '李宗盛',
    englishName: 'Jonathan Lee',
    emoji: '🍵',
    color: '#8d6e63',
    songs: ['山丘','給自己的歌','領悟','凡人歌','問','夢醒時分','我是一隻小小鳥','你像個孩子','當愛已成往事','漂洋過海來看你']
  },
  {
    id: 'wfr',
    name: '王菲',
    englishName: 'Faye Wong',
    emoji: '🌙',
    color: '#7c4dff',
    songs: ['紅豆','夢中人','執迷不悔','傳奇','容易受傷的女人','我願意','棋子','匆匆那年','Eyes on Me']
  }
];

// State
let queue = [];
let currentSong = null;
let activeArtist = 'all';
let searchQuery = '';

// Init
function init() {
  renderArtistTabs();
  renderContent();
  // 手機版預設收起 queue panel
  if (window.innerWidth <= 768) {
    document.getElementById('queuePanel').classList.add('hidden');
  }
}

function renderArtistTabs() {
  // 桌面版 sidebar tabs
  const container = document.getElementById('artistTabs');
  container.innerHTML = ARTISTS.map(a => `
    <div class="artist-tab" onclick="filterArtist('${a.id}')" data-artist="${a.id}">
      <div class="avatar" style="background: ${a.color}22; border-color: ${a.color}44">${a.emoji}</div>
      <div class="name">${a.name}</div>
    </div>
  `).join('');

  // 手機版 dropdown options
  const select = document.getElementById('artistSelect');
  select.innerHTML = '<option value="all">🎵 全部歌手</option>' +
    ARTISTS.map(a => `<option value="${a.id}">${a.emoji} ${a.name}</option>`).join('');
}

function filterArtist(id) {
  activeArtist = id;
  searchQuery = '';
  document.getElementById('searchInput').value = '';
  // 桌面版 tabs
  document.querySelectorAll('.artist-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.artist === id);
  });
  // 手機版 dropdown 同步
  const select = document.getElementById('artistSelect');
  if (select.value !== id) select.value = id;
  renderContent();
}

function renderContent() {
  const content = document.getElementById('content');
  const artists = activeArtist === 'all' ? ARTISTS : ARTISTS.filter(a => a.id === activeArtist);
  const q = searchQuery.trim().toLowerCase();

  let html = '';

  for (const artist of artists) {
    let songs = artist.songs;
    if (q) {
      songs = songs.filter(s => s.toLowerCase().includes(q) || artist.name.toLowerCase().includes(q));
    }
    if (songs.length === 0) continue;

    html += `
      <div class="artist-section" id="section-${artist.id}">
        <div class="artist-header">
          <div class="artist-icon" style="background: ${artist.color}15; border-color: ${artist.color}60; color: ${artist.color}">${artist.emoji}</div>
          <div class="artist-info">
            <h2 style="color: ${artist.color}">${artist.name}</h2>
            <p>${artist.englishName} · ${songs.length} 首歌曲</p>
          </div>
        </div>
        <div class="songs-grid">
          ${songs.map(song => renderSongCard(song, artist, q)).join('')}
        </div>
      </div>
    `;
  }

  if (!html) {
    html = `
      <div style="text-align:center; padding: 60px; color: var(--text-dim)">
        <div style="font-size:3rem; margin-bottom:16px; opacity:0.4">🔍</div>
        <div>找不到「${searchQuery}」相關歌曲</div>
      </div>
    `;
  }

  content.innerHTML = html;
}

function renderSongCard(song, artist, highlight) {
  const isQueued = queue.some(q => q.song === song && q.artist === artist.name);
  let displayName = song;
  if (highlight) {
    const idx = song.toLowerCase().indexOf(highlight);
    if (idx >= 0) {
      displayName = song.slice(0, idx) + `<span class="highlight">${song.slice(idx, idx + highlight.length)}</span>` + song.slice(idx + highlight.length);
    }
  }
  return `
    <div class="song-card ${isQueued ? 'queued' : ''}" onclick="toggleSong('${song}', '${artist.id}')">
      <span class="song-name">${displayName}</span>
      <div class="add-btn">${isQueued ? '✓' : '+'}</div>
    </div>
  `;
}

function toggleSong(song, artistId) {
  const artist = ARTISTS.find(a => a.id === artistId);
  const idx = queue.findIndex(q => q.song === song && q.artist === artist.name);
  if (idx >= 0) {
    queue.splice(idx, 1);
    showToast(`已移除《${song}》`);
  } else {
    queue.push({ song, artist: artist.name, emoji: artist.emoji, color: artist.color });
    showToast(`🎵 已點《${song}》 - ${artist.name}`);
  }
  renderContent();
  renderQueue();
}

function renderQueue() {
  const count = queue.length;
  const countEl = document.getElementById('queueCount');
  countEl.textContent = count;
  countEl.style.display = count > 0 ? 'flex' : 'none';

  document.getElementById('queueSummary').textContent =
    count === 0 ? '尚未點歌' : `共 ${count} 首歌曲`;

  const listEl = document.getElementById('queueList');
  const nextBtn = document.getElementById('nextBtn');
  const nowSection = document.getElementById('nowPlayingSection');

  // Now playing
  if (currentSong) {
    nowSection.style.display = 'block';
    document.getElementById('nowPlayingSong').textContent = `${currentSong.emoji} ${currentSong.song}`;
    document.getElementById('nowPlayingArtist').textContent = currentSong.artist;
  } else {
    nowSection.style.display = 'none';
  }

  if (queue.length === 0) {
    listEl.innerHTML = `
      <div class="queue-empty">
        <div class="empty-icon">🎤</div>
        <div>點選左側歌曲加入點歌清單</div>
      </div>
    `;
    nextBtn.disabled = true;
    return;
  }

  nextBtn.disabled = false;
  listEl.innerHTML = queue.map((item, i) => `
    <div class="queue-item">
      <div class="queue-num">${i === 0 ? '▶' : i + 1}</div>
      <div class="queue-info">
        <div class="queue-song">${item.emoji} ${item.song}</div>
        <div class="queue-artist">${item.artist}</div>
      </div>
      <button class="queue-remove" onclick="removeFromQueue(${i})" title="移除">✕</button>
    </div>
  `).join('');
}

function removeFromQueue(i) {
  const removed = queue.splice(i, 1)[0];
  showToast(`已移除《${removed.song}》`);
  renderContent();
  renderQueue();
}

function nextSong() {
  if (queue.length === 0) return;
  currentSong = queue.shift();
  showToast(`🎤 正在演唱：${currentSong.song} - ${currentSong.artist}`);
  renderContent();
  renderQueue();
}

function clearQueue() {
  if (queue.length === 0) return;
  queue = [];
  showToast('🗑️ 已清空點歌清單');
  renderContent();
  renderQueue();
}

function shuffleQueue() {
  if (queue.length < 2) return;
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
  showToast('🔀 已隨機排序');
  renderQueue();
}

function toggleQueue() {
  const panel = document.getElementById('queuePanel');
  const backdrop = document.getElementById('queueBackdrop');
  const isHidden = panel.classList.toggle('hidden');
  backdrop.classList.toggle('show', !isHidden);
}

function closeQueue() {
  const panel = document.getElementById('queuePanel');
  const backdrop = document.getElementById('queueBackdrop');
  panel.classList.add('hidden');
  backdrop.classList.remove('show');
}

// Mobile artist dropdown
document.getElementById('artistSelect').addEventListener('change', e => {
  filterArtist(e.target.value);
});

// Search
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  activeArtist = 'all';
  document.querySelectorAll('.artist-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.artist === 'all');
  });
  renderContent();
});

// Toast
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// Sidebar drag-to-resize (mobile only)
function initSidebarResize() {
  const sidebar = document.getElementById('sidebar');
  const handle = document.getElementById('sidebarResizeHandle');
  if (!handle) return;

  let startY = 0;
  let startHeight = 0;
  const MIN_H = 50;
  const MAX_H = 200;
  const EXPAND_THRESHOLD = 90;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function onStart(e) {
    if (!isMobile()) return;
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startHeight = sidebar.offsetHeight;
    handle.classList.add('dragging');
    sidebar.style.transition = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);
    e.preventDefault();
  }

  function onMove(e) {
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const newH = Math.min(MAX_H, Math.max(MIN_H, startHeight + (y - startY)));
    sidebar.style.height = newH + 'px';
    sidebar.classList.toggle('expanded', newH > EXPAND_THRESHOLD);
    e.preventDefault();
  }

  function onEnd() {
    handle.classList.remove('dragging');
    sidebar.style.transition = '';
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('mouseup', onEnd);
    document.removeEventListener('touchend', onEnd);
  }

  handle.addEventListener('mousedown', onStart);
  handle.addEventListener('touchstart', onStart, { passive: false });
}

init();
initSidebarResize();
