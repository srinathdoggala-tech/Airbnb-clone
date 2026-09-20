import React, { useState, useEffect } from 'react';

const ROOM_CATEGORIES = [
  { id: 'tour-room-0', label: 'Living room 1', img: '/assets/images/a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg' },
  { id: 'tour-room-1', label: 'Living room 2', img: '/assets/images/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg' },
  { id: 'tour-room-2', label: 'Full kitchen', img: '/assets/images/56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg' },
  { id: 'tour-room-3', label: 'Bedroom', img: '/assets/images/67c61c6f-6260-4809-9510-0360e58a345d.jpeg' },
  { id: 'tour-room-4', label: 'Full bathroom', img: '/assets/images/97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg' },
  { id: 'tour-room-5', label: 'Gym', img: '/assets/images/9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg' },
  { id: 'tour-room-6', label: 'Exterior', img: '/assets/images/23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg' },
  { id: 'tour-room-7', label: 'Pool', img: '/assets/images/fc02f48f-a937-42c5-895d-f9cc3113d6ca.jpeg' },
  { id: 'tour-room-8', label: 'Additional photos', img: '/assets/images/70325367-cbae-4993-b560-18cd3f6edd53.jpeg' },
];

export default function PhotoTourModal({ isOpen, onClose, onPhotoClick, onShare, onSave, isSaved }) {
  const [activeRoomId, setActiveRoomId] = useState('tour-room-0');

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('_pINcte');
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.classList.remove('_pINcte');
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  // Scroll to targeted room category section smoothly
  const scrollToRoom = (roomId) => {
    setActiveRoomId(roomId);
    const container = document.getElementById('tourScroll');
    if (roomId === 'tour-room-0' && container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(roomId);
    if (container && target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const targetScrollTop = container.scrollTop + (targetRect.top - containerRect.top) - 16;
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll-spy observer to track active room category as user scrolls
  useEffect(() => {
    if (!isOpen) return;
    const container = document.getElementById('tourScroll');
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop < 100) {
        setActiveRoomId('tour-room-0');
        return;
      }
      const roomSections = ROOM_CATEGORIES.map((c) => document.getElementById(c.id)).filter(Boolean);
      const containerRect = container.getBoundingClientRect();

      let currentId = 'tour-room-0';
      for (const sec of roomSections) {
        const secRect = sec.getBoundingClientRect();
        if (secRect.top <= containerRect.top + 160) {
          currentId = sec.id;
        }
      }
      setActiveRoomId(currentId);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`_KpcKWX ${isOpen ? '_PjnNJs' : ''}`}
      id="_KpcKWX"
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
    >
      <header className="_TCWfOg" id="tourBar">
        <button className="_ffpbhP _bNHEUf" type="button" aria-label="Back" id="tourBack" onClick={onClose}>
          <span>
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{ display: 'block', height: '100%', width: '100%', fill: 'none', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible' }}
            >
              <path d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </span>
        </button>

        <h2 className="_usJUoS">Photo tour</h2>

        <div className="_bLFgMg">
          <button className="_bNHEUf" type="button" aria-label="Share" onClick={onShare}>
            <span>
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{ display: 'block', height: '100%', width: '100%', fill: 'none', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible' }}
              >
                <path d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289" fill="none"></path>
              </svg>
            </span>
          </button>
          <button className={`_bNHEUf ${isSaved ? '_nfavct' : ''}`} type="button" aria-label="Save" onClick={onSave}>
            <span>
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: 'block',
                  height: '100%',
                  width: '100%',
                  fill: isSaved ? '#ff385c' : 'none',
                  stroke: isSaved ? '#ff385c' : 'currentColor',
                  strokeWidth: '2',
                  overflow: 'visible',
                  transition: 'fill .2s ease, stroke .2s ease'
                }}
              >
                <path d="m15.9998 28.6668c7.1667-4.8847 14.3334-10.8844 14.3334-18.1088 0-1.84951-.6993-3.69794-2.0988-5.10877-1.3996-1.4098-3.2332-2.11573-5.0679-2.11573-1.8336 0-3.6683.70593-5.0668 2.11573l-2.0999 2.11677-2.0988-2.11677c-1.3995-1.4098-3.2332-2.11573-5.06783-2.11573-1.83364 0-3.66831.70593-5.06683 2.11573-1.39955 1.41083-2.09984 3.25926-2.09984 5.10877 0 7.2244 7.16667 13.2241 14.3333 18.1088z"></path>
              </svg>
            </span>
          </button>
        </div>
      </header>

      <div className="_EpiBQR" id="tourScroll">
        <div className="_hKlfpJ">
          {/* Categories Navigation Bar */}
          <nav className="_tHVclZ" id="tourNav" aria-label="Photo categories">
            {ROOM_CATEGORIES.map((cat) => {
              const isActive = activeRoomId === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`_gKVFNL ${isActive ? '_active' : ''}`}
                  type="button"
                  aria-label={cat.label}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => scrollToRoom(cat.id)}
                >
                  <img
                    loading="lazy"
                    alt=""
                    src={cat.img}
                    style={
                      isActive
                        ? {
                            outline: '2px solid var(--hof, #222222)',
                            outlineOffset: '2px',
                            boxShadow: '0 0 0 2px var(--hof, #222222)',
                            borderRadius: '8px'
                          }
                        : { borderRadius: '8px' }
                    }
                  />
                  <span
                    className="_tAbhrW"
                    style={
                      isActive
                        ? {
                            color: 'var(--hof, #222222)',
                            fontWeight: 600,
                            textDecoration: 'underline'
                          }
                        : {}
                    }
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Room Sections */}
          <div className="tour-rooms" id="tourRooms">
            {/* Section 0: Living room 1 */}
            <section className="_AWcqip" id="tour-room-0">
              <div className="_yZYwUW">
                <div className="_AnkvRF">Living room 1</div>
                <div className="_hvJgUS">Sofa  ·  Air conditioning  ·  Ceiling fan  ·  TV</div>
              </div>
              <div className="_MbzoEk">
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="0" onClick={() => onPhotoClick(0)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 1">
                    <img loading="lazy" alt="Living room 1" src="/assets/images/a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="1" onClick={() => onPhotoClick(1)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 2">
                    <img loading="lazy" alt="Living room 1" src="/assets/images/a45feaa2-b607-4092-83ac-5fd4b2894959.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="2" onClick={() => onPhotoClick(2)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 3">
                    <img loading="lazy" alt="Living room 1" src="/assets/images/f1da1c3d-0d10-481e-9b63-c71f9073f30b.jpeg" />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 1: Living room 2 */}
            <section className="_AWcqip" id="tour-room-1">
              <div className="_yZYwUW">
                <div className="_AnkvRF">Living room 2</div>
                <div className="_hvJgUS">Ceiling fan  ·  Hot tub</div>
              </div>
              <div className="_MbzoEk">
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="3" onClick={() => onPhotoClick(3)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 4">
                    <img loading="lazy" alt="Living room 2" src="/assets/images/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="4" onClick={() => onPhotoClick(4)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 5">
                    <img loading="lazy" alt="Living room 2" src="/assets/images/9be71047-fc52-438a-9270-75cb470f6752.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="5" onClick={() => onPhotoClick(5)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 6">
                    <img loading="lazy" alt="Living room 2" src="/assets/images/f6de1663-4e9c-4414-b63b-29a154a92ee1.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="6" onClick={() => onPhotoClick(6)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 7">
                    <img loading="lazy" alt="Living room 2" src="/assets/images/2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="7" onClick={() => onPhotoClick(7)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 8">
                    <img loading="lazy" alt="Living room 2" src="/assets/images/34529829-a971-44d3-ac2f-90ea3678a34d.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="8" onClick={() => onPhotoClick(8)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 9">
                    <img loading="lazy" alt="Living room 2" src="/assets/images/153aa732-4935-48b8-a6fe-b469b6af5efc.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="9" onClick={() => onPhotoClick(9)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 10">
                    <img loading="lazy" alt="Living room 2" src="/assets/images/3c6e6809-1bb1-47a6-8e24-aff593e1c28f.jpeg" />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 2: Full kitchen */}
            <section className="_AWcqip" id="tour-room-2">
              <div className="_yZYwUW">
                <div className="_AnkvRF">Full kitchen</div>
                <div className="_hvJgUS">Freezer  ·  Fridge  ·  Blender  ·  Cooker  ·  Cooking basics  ·  Kettle  ·  Microwave  ·  Toaster  ·  Wine glasses  ·  Coffee  ·  Crockery and cutlery</div>
              </div>
              <div className="_MbzoEk">
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="10" onClick={() => onPhotoClick(10)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 11">
                    <img loading="lazy" alt="Full kitchen" src="/assets/images/56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="11" onClick={() => onPhotoClick(11)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 12">
                    <img loading="lazy" alt="Full kitchen" src="/assets/images/ddc853d7-e658-405c-bedc-8f31106c447e.jpeg" />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 3: Bedroom */}
            <section className="_AWcqip" id="tour-room-3">
              <div className="_yZYwUW">
                <div className="_AnkvRF">Bedroom</div>
                <div className="_hvJgUS">Double bed  ·  Air conditioning  ·  Bed linen  ·  Ceiling fan  ·  Clothes storage  ·  Cot  ·  Hangers  ·  Iron  ·  Room-darkening blinds  ·  Cleaning available during stay  ·  Cleaning products  ·  Long-term stays allowed  ·  Private entrance  ·  Wifi</div>
              </div>
              <div className="_MbzoEk">
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="12" onClick={() => onPhotoClick(12)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 13">
                    <img loading="lazy" alt="Bedroom" src="/assets/images/67c61c6f-6260-4809-9510-0360e58a345d.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="13" onClick={() => onPhotoClick(13)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 14">
                    <img loading="lazy" alt="Bedroom" src="/assets/images/1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="14" onClick={() => onPhotoClick(14)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 15">
                    <img loading="lazy" alt="Bedroom" src="/assets/images/0622ab42-b851-4d55-9d9f-df3143bc5909.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="15" onClick={() => onPhotoClick(15)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 16">
                    <img loading="lazy" alt="Bedroom" src="/assets/images/a74e3c0b-3188-4442-9146-1cd4d6ea45df.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="16" onClick={() => onPhotoClick(16)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 17">
                    <img loading="lazy" alt="Bedroom" src="/assets/images/48a8ffbc-fbf7-4f84-bc29-ee400da3f08b.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="17" onClick={() => onPhotoClick(17)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 18">
                    <img loading="lazy" alt="Bedroom" src="/assets/images/3cf31697-f3f3-4c60-82c4-029acb119ae4.jpeg" />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 4: Full bathroom */}
            <section className="_AWcqip" id="tour-room-4">
              <div className="_yZYwUW">
                <div className="_AnkvRF">Full bathroom</div>
                <div className="_hvJgUS">Hairdryer  ·  Hot water  ·  Shampoo  ·  Shower gel</div>
              </div>
              <div className="_MbzoEk">
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="18" onClick={() => onPhotoClick(18)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 19">
                    <img loading="lazy" alt="Full bathroom" src="/assets/images/97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg" />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 5: Gym */}
            <section className="_AWcqip" id="tour-room-5">
              <div className="_yZYwUW">
                <div className="_AnkvRF">Gym</div>
                <div className="_hvJgUS">Air conditioning  ·  Gym  ·  Exercise equipment  ·  Ceiling fan</div>
              </div>
              <div className="_MbzoEk">
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="19" onClick={() => onPhotoClick(19)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 20">
                    <img loading="lazy" alt="Gym" src="/assets/images/9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="20" onClick={() => onPhotoClick(20)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 21">
                    <img loading="lazy" alt="Gym" src="/assets/images/246bd88d-4dd6-4117-a401-02a36ebfcf16.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="21" onClick={() => onPhotoClick(21)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 22">
                    <img loading="lazy" alt="Gym" src="/assets/images/4fede77d-7a71-446f-89e3-263af937f3fa.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="22" onClick={() => onPhotoClick(22)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 23">
                    <img loading="lazy" alt="Gym" src="/assets/images/79f59adb-5a5f-4d6c-8109-1f01f4ca0d03.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="23" onClick={() => onPhotoClick(23)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 24">
                    <img loading="lazy" alt="Gym" src="/assets/images/f19d8c0a-1d88-42a4-9218-686d4f0db7e4.jpeg" />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 6: Exterior */}
            <section className="_AWcqip" id="tour-room-6">
              <div className="_yZYwUW">
                <div className="_AnkvRF">Exterior</div>
              </div>
              <div className="_MbzoEk">
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="24" onClick={() => onPhotoClick(24)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 25">
                    <img loading="lazy" alt="Exterior" src="/assets/images/23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="25" onClick={() => onPhotoClick(25)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 26">
                    <img loading="lazy" alt="Exterior" src="/assets/images/5adfdf3e-d497-4efc-ab8c-fc559dab311e.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="26" onClick={() => onPhotoClick(26)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 27">
                    <img loading="lazy" alt="Exterior" src="/assets/images/608748cd-6ee7-4a71-88a2-ba79d3ddba5a.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="27" onClick={() => onPhotoClick(27)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 28">
                    <img loading="lazy" alt="Exterior" src="/assets/images/5b856fde-a393-41bf-b373-c9d02e64221f.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="28" onClick={() => onPhotoClick(28)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 29">
                    <img loading="lazy" alt="Exterior" src="/assets/images/c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="29" onClick={() => onPhotoClick(29)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 30">
                    <img loading="lazy" alt="Exterior" src="/assets/images/42befad7-fb29-473d-91db-b03e7a544d1d.jpeg" />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 7: Pool */}
            <section className="_AWcqip" id="tour-room-7">
              <div className="_yZYwUW">
                <div className="_AnkvRF">Pool</div>
                <div className="_hvJgUS">Pool</div>
              </div>
              <div className="_MbzoEk">
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="30" onClick={() => onPhotoClick(30)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 31">
                    <img loading="lazy" alt="Pool" src="/assets/images/fc02f48f-a937-42c5-895d-f9cc3113d6ca.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="31" onClick={() => onPhotoClick(31)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 32">
                    <img loading="lazy" alt="Pool" src="/assets/images/929545d3-e241-46c0-8a70-c24531ce7b54.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="32" onClick={() => onPhotoClick(32)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 33">
                    <img loading="lazy" alt="Pool" src="/assets/images/8eb65a8b-e795-4870-b141-6f63b1be24ae.jpeg" />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 8: Additional photos */}
            <section className="_AWcqip" id="tour-room-8">
              <div className="_yZYwUW">
                <div className="_AnkvRF">Additional photos</div>
              </div>
              <div className="_MbzoEk">
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="33" onClick={() => onPhotoClick(33)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 34">
                    <img loading="lazy" alt="Additional photos" src="/assets/images/70325367-cbae-4993-b560-18cd3f6edd53.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="34" onClick={() => onPhotoClick(34)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 35">
                    <img loading="lazy" alt="Additional photos" src="/assets/images/cc7a56bd-242c-498a-9aef-0cffac619e54.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="35" onClick={() => onPhotoClick(35)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 36">
                    <img loading="lazy" alt="Additional photos" src="/assets/images/30ad93b2-293f-494d-b645-626303c6cb93.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="36" onClick={() => onPhotoClick(36)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 37">
                    <img loading="lazy" alt="Additional photos" src="/assets/images/9642a60d-e9de-4e1a-89c2-9ebd230f4a74.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="37" onClick={() => onPhotoClick(37)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 38">
                    <img loading="lazy" alt="Additional photos" src="/assets/images/b6599f26-d65c-4df0-baf2-ef18c82a86a3.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="38" onClick={() => onPhotoClick(38)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 39">
                    <img loading="lazy" alt="Additional photos" src="/assets/images/dc01fd46-b119-48d3-a43b-f6c093e26eca.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="39" onClick={() => onPhotoClick(39)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 40">
                    <img loading="lazy" alt="Additional photos" src="/assets/images/fe37b80e-da8a-4225-b27b-dfbb5d763c01.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _DLVRjk">
                  <button className="_GXrMIo" type="button" data-idx="40" onClick={() => onPhotoClick(40)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 41">
                    <img loading="lazy" alt="Additional photos" src="/assets/images/3c90338e-86b4-423f-aae1-279e0ccc3a18.jpeg" />
                  </button>
                  <button className="_GXrMIo" type="button" data-idx="41" onClick={() => onPhotoClick(41)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 42">
                    <img loading="lazy" alt="Additional photos" src="/assets/images/862d936c-0f34-4e50-af87-b519e2781d19.jpeg" />
                  </button>
                </div>
                <div className="_wdcjGJ _vmCONz">
                  <button className="_GXrMIo" type="button" data-idx="42" onClick={() => onPhotoClick(42)} aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 43">
                    <img loading="lazy" alt="Additional photos" src="/assets/images/79addceb-8c2d-419b-80ff-e29af426a94c.jpeg" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
