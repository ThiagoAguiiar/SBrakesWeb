export default function Kommunicate() {
  return (function (d, m) {
    var kommunicateSettings = {
      appId: '284fdd97a49f9aa39846cac3f2d7975d8',
      popupWidget: true,
      automaticChatOpenOnNavigation: true,
    };
    var s = document.createElement('script');

    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
    var h = document.getElementsByTagName('head')[0];
    h.appendChild(s);
    window.kommunicate = m;
    m._globals = kommunicateSettings;
  })(document, window.kommunicate || {});
}
