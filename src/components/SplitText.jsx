import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current || !text) return;
      const el = ref.current;

      const targets = el.querySelectorAll('.split-char');
      if (!targets.length) return;

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4
          },
          onComplete: () => {
            onLetterAnimationComplete?.();
          },
          willChange: 'transform, opacity',
          force3D: true
        }
      );
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin
      ],
      scope: ref
    }
  );

  const renderWords = () => {
    const words = text.split(' ');
    return words.map((word, wordIndex) => (
      <span
        key={`word-${wordIndex}`}
        className="split-word"
        style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
      >
        {word.split('').map((char, charIndex) => (
          <span
            key={`char-${charIndex}`}
            className="split-char"
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          >
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 && (
          <span className="split-space" style={{ display: 'inline-block' }}>
            &nbsp;
          </span>
        )}
      </span>
    ));
  };

  const style = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };

  const Tag = tag || 'p';

  return (
    <Tag ref={ref} style={style} className={`split-parent ${className}`}>
      {renderWords()}
    </Tag>
  );
};

export default SplitText;
