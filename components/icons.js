import React from 'react';

export const PlayIcon = ({ className }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: className || 'w-6 h-6' },
    React.createElement('path', { fillRule: "evenodd", d: "M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z", clipRule: "evenodd" })
  )
);

export const StopIcon = ({ className }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: className || 'w-6 h-6' },
    React.createElement('path', { fillRule: "evenodd", d: "M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z", clipRule: "evenodd" })
  )
);

export const InfoIcon = ({ className }) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className || 'w-6 h-6' },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" })
    )
);

export const RocketIcon = ({ className }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className || 'w-6 h-6' },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a12.02 12.02 0 0 0-5.84-2.56m0 0a12.023 12.023 0 0 1-5.84-2.56m5.84 2.56v-4.82m0 0a6 6 0 0 1-5.84-7.38m5.84 7.38a12.023 12.023 0 0 0 5.84 2.56m-5.84-2.56a6 6 0 0 0 5.84 7.38m0 0c-1.48.16-2.953.296-4.425.418m0 0a12.022 12.022 0 0 1-11.25-6.684m11.25 6.684v-4.82" })
  )
);