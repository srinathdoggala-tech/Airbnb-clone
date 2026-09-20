import React, { useEffect } from 'react';

export default function LightboxModal({
  isOpen,
  currentIndex,
  totalPhotos,
  categoryName,
  currentPhotoSrc,
  fallbackSrc,
  onClose,
  onGridClick,
  onPrev,
  onNext
}) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('_pINcte');
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.classList.remove('_pINcte');
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div className={`_zFbfbh ${isOpen ? '_PjnNJs' : ''}`} id="lightbox" aria-hidden={!isOpen} role="dialog" aria-modal="true" aria-label="Photo viewer"><header className="_LWXeEY"><button className="_CscuGL _bNHEUf" type="button" aria-label="Show all photos" id="lbGrid" onClick={onGridClick}><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}><path fillRule="evenodd" d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"></path></svg></span></button><div className="_QIemms" id="lbTitle">{categoryName}</div><div className="_lVGbrm"><span className="_iRDAKc" id="lbCounter">{currentIndex + 1} / {totalPhotos}</span><button className="lb-close _bNHEUf" type="button" aria-label="Close" id="lbClose" onClick={onClose}><span><svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'none', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible' }}><path d="M6 6l20 20M26 6 6 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span></button></div></header><button className="_KNOVTi _VTIXSd _bNHEUf" type="button" aria-label="Previous" id="lbPrev" disabled={currentIndex === 0} onClick={onPrev}><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'none', stroke: 'currentColor', strokeWidth: '4', overflow: 'visible' }}> <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg></span></button><div className="_VPKRNC" id="lbStage"><img key={currentIndex} className="_SSnzPz" src={currentPhotoSrc} alt={categoryName} onError={(e) => { if (fallbackSrc && e.currentTarget.src !== fallbackSrc) { e.currentTarget.src = fallbackSrc; } }} /></div><button className="_KNOVTi _VkQoEV _bNHEUf" type="button" aria-label="Next" id="lbNext" disabled={currentIndex === totalPhotos - 1} onClick={onNext}><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'none', stroke: 'currentColor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg></span></button></div>
  );
}
