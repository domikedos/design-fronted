export const useTelegramAuth = () => {
  const botId = '7630411210';
  const origin = window.location.origin;

  const openTelegramAuthWindow = () => {
    const url = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent(origin)}&embed=0&request_access=write&return_to=some-url`;
    const width = 550;
    const height = 450;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    window.open(url, 'TelegramAuthWindow', windowFeatures);
  };

  return { openTelegramAuthWindow };
}; 