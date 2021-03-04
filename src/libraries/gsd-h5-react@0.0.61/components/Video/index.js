import * as React from "react";

export default function ({ id, data, style, className, emit, children, domRef }) {
  const { src, poster, initialTime, muted, controls, autoplay = false, loop = false } = data;
  return <video
    id={id}
    src={src}
    className={className}
    ref={domRef}
    poster={poster}
    currentTime={initialTime}
    muted={muted}
    controls={controls}
    autoPlay={autoplay}
    loop={loop}
    style={style}
    width={300}
    height={225}
    onPlay={(v) => emit('play', v)}
    onPause={(v) => emit('pause', v)}
    onEnded={(v) => emit('ended', v)}
    onTimeUpdate={(v) => emit('timeupdate', v)}
    onError={(v) => emit('error', v)}
    onWaiting={(v) => emit('waiting', v)}
    onProgress={(v) => emit('progress', v)}
    onLoadedData={(v) => emit('loadedmetadata', v)}
    onSeeked={(v) => emit('seekcomplete', v)}>
    抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 <a href={src}>下载</a>
      并用你喜欢的播放器观看!
    </video>
}

