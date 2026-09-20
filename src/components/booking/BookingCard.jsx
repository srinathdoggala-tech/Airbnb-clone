import React from 'react';

export default function BookingCard({ onReserve, onClaimDiscount, onReport }) {
  return (
    <div className="_bUsxCi" id="bookingSticky">
      <div className="_bJChEA">
        <img className="_hbNVom" src="/assets/images/ui/discount.svg" alt="" aria-hidden="true" />
        <div className="_erTcst">
          Get 10% off your next stay.<br />
          <a href="#terms" onClick={(e) => e.preventDefault()}>Terms apply</a>
        </div>
        <button className="_Spojam" type="button" onClick={onClaimDiscount}>Claim</button>
      </div>
      <div className="_ehfyuX">
        <div className="_HEyPzI">
          <span className="_AjpxES">₹28,499</span>
          <span className="_kNZPIK">for 5 nights</span>
        </div>
        <div className="_GLDaPq">
          <div className="_IJyfOk">
            <div className="_NdLgZo">
              <div className="_mvnlYS">CHECK-IN</div>
              <div className="_vUECFC">10/18/2026</div>
            </div>
            <div className="_NdLgZo">
              <div className="_mvnlYS">CHECKOUT</div>
              <div className="_vUECFC">10/23/2026</div>
            </div>
          </div>
          <div className="_FiFzqL">
            <div>
              <div className="_mvnlYS">GUESTS</div>
              <div className="_vUECFC">2 guests</div>
            </div>
            <span className="_SrOOll">
              <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'none', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible' }}>
                <path d="M4 10l12 12 12-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
        <div className="_MMdioP">Free cancellation before <b>17 October</b></div>
        <button className="_NhmiWB _YkNyTO" type="button" id="reserveBtn" onClick={onReserve}>Reserve</button>
        <div className="_mtuwgH">You won't be charged yet</div>
      </div>
      <div className="_jcEuOw">
        <span className="ico">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}>
            <path d="m7.5011 1c.5272 0 .9591.40794.99725.92537l.00275.07463v1h5.5c.31265 0 .5435.281645.4935.581075l-.01275.056285-.96125 3.36264.96125 3.36265c.08055.2818-.0967.5625-.36775.62465l-.0554.00945-.0576.00325h-5.5c-.5272 0-.9591-.40795-.99725-.92535l-.00275-.07465v-1h-5v6h-1v-14zm1 3h-1v4h1z" />
          </svg>
        </span>
        <a href="#report" onClick={(e) => { e.preventDefault(); if (onReport) onReport(); }}>Report this listing</a>
      </div>
    </div>
  );
}
