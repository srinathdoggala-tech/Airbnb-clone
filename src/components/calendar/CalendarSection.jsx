import React from 'react';

export default function CalendarSection({ onClearDates }) {
  return (
    <div className="_QZaLue">
      <div>
        <div className="_zAWnNQ">
          <div className="_JwWFHq">5 nights in Candolim</div>
          <div className="_joNbzi">18 Oct 2026 - 23 Oct 2026</div>
        </div>
        <div className="_jjUQkB">
          <div className="_VXHyjS">
            <button aria-label="Previous month">
              <span className="ico">
                <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}>
                  <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd"></path>
                </svg>
              </span>
            </button>
            <button aria-label="Next month">
              <span className="ico">
                <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}>
                  <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path>
                </svg>
              </span>
            </button>
          </div>
          <div className="_DSpFpO">
            <div className="_JyICyg">October 2026</div>
            <div className="_FnrmaC">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="_eeeBPf">
              <div className="_UHweot _cvZNKV"></div><div className="_UHweot _cvZNKV"></div><div className="_UHweot _cvZNKV"></div><div className="_UHweot _cvZNKV"></div>
              <div className="_UHweot">1</div><div className="_UHweot">2</div><div className="_UHweot">3</div><div className="_UHweot">4</div><div className="_UHweot">5</div><div className="_UHweot">6</div><div className="_UHweot">7</div><div className="_UHweot">8</div><div className="_UHweot">9</div><div className="_UHweot">10</div><div className="_UHweot">11</div><div className="_UHweot">12</div><div className="_UHweot">13</div><div className="_UHweot">14</div><div className="_UHweot">15</div><div className="_UHweot">16</div><div className="_UHweot">17</div>
              <div className="_UHweot _gTtWjP">18</div><div className="_UHweot _lIMKSn">19</div><div className="_UHweot _lIMKSn">20</div><div className="_UHweot _lIMKSn">21</div><div className="_UHweot _lIMKSn">22</div><div className="_UHweot _ifYNOn">23</div>
              <div className="_UHweot">24</div><div className="_UHweot">25</div><div className="_UHweot">26</div><div className="_UHweot">27</div><div className="_UHweot">28</div><div className="_UHweot">29</div><div className="_UHweot">30</div><div className="_UHweot">31</div>
            </div>
          </div>
          <div className="_DSpFpO">
            <div className="_JyICyg">November 2026</div>
            <div className="_FnrmaC">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="_eeeBPf">
              <div className="_UHweot">1</div><div className="_UHweot">2</div><div className="_UHweot">3</div><div className="_UHweot">4</div><div className="_UHweot">5</div><div className="_UHweot">6</div><div className="_UHweot">7</div><div className="_UHweot">8</div><div className="_UHweot">9</div><div className="_UHweot">10</div><div className="_UHweot">11</div><div className="_UHweot">12</div><div className="_UHweot">13</div><div className="_UHweot">14</div><div className="_UHweot">15</div><div className="_UHweot">16</div><div className="_UHweot">17</div>
              <div className="_UHweot _FXEbnd">18</div><div className="_UHweot _FXEbnd">19</div><div className="_UHweot _FXEbnd">20</div><div className="_UHweot _FXEbnd">21</div><div className="_UHweot _FXEbnd">22</div><div className="_UHweot _FXEbnd">23</div><div className="_UHweot _FXEbnd">24</div>
              <div className="_UHweot">25</div><div className="_UHweot">26</div><div className="_UHweot">27</div><div className="_UHweot">28</div>
              <div className="_UHweot _FXEbnd">29</div><div className="_UHweot _FXEbnd">30</div>
            </div>
          </div>
        </div>
        <button
          className="_WKAkzo"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (onClearDates) onClearDates();
          }}
        >
          Clear dates
        </button>
      </div>
    </div>
  );
}
