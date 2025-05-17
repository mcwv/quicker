// background.js

function extractYouTubeID(rawUrl) {
  try {
    const u = new URL(rawUrl);
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1);
    }
    if (u.hostname.endsWith('youtube.com')) {
      return u.searchParams.get('v');
    }
  } catch (e) {
    console.error('Bad URL:', rawUrl, e);
  }
  return null;
}

function triggerDownload(url) {
  const id = extractYouTubeID(url);
  if (id) {
    const target = `https://yt1z.net/en/video/${id}`;
    browser.tabs.create({ url: target });
  } else {
    browser.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'YT1z Downloader',
      message: 'Couldn’t parse a YouTube video ID on this page.'
    });
  }
}

// Toolbar button
browser.browserAction.onClicked.addListener((tab) => {
  triggerDownload(tab.url);
});

// Keyboard shortcut (Ctrl+Shift+X)
browser.commands.onCommand.addListener((command) => {
  if (command === 'download-current-video') {
    browser.tabs.query({ active: true, currentWindow: true })
      .then((tabs) => {
        if (tabs[0]) triggerDownload(tabs[0].url);
      });
  }
});
