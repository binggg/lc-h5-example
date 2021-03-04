export function isPC() {
  return !/(iPhone|iPad|iPod|iOS|Android)/i.test(window.navigator.userAgent);
}

export function isMQQ() {
  return /qq\/(\d+\.\d+)/i.test(window.navigator.userAgent.toLowerCase());
}

export function isWeixin() {
  return window.navigator.userAgent.indexOf('micromessenger') !== -1;
}

export function isWeixinMinProgram() {
  return !!process.env.isMiniprogram; // injected at compile time by app builder
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
}

const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
const localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;

export function isUrl(string) {
  if (typeof string !== 'string') {
    return false;
  }

  const match = string.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  return (
    localhostDomainRE.test(everythingAfterProtocol)
    || nonLocalhostDomainRE.test(everythingAfterProtocol)
  );
}
