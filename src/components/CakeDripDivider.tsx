import React from 'react';

interface CakeDripDividerProps {
  fillColor?: string; // color of the dripping liquid
  className?: string;
  inverted?: boolean;
  withGloss?: boolean;
}

export function CakeDripDivider({
  fillColor = '#143B45',
  className = '',
  inverted = false,
  withGloss = true,
}: CakeDripDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none relative z-10 ${
        inverted ? 'rotate-180 -mt-1' : '-mb-1'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-10 sm:h-14 lg:h-20 block preserve-3d"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={`dripShadow-${fillColor.replace(/[^a-zA-Z0-9]/g, '')}`} x="-5%" y="-5%" width="110%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Liquid Ganache Dripping Layer */}
        <path
          d="M0,0 L1440,0 L1440,24 
             C1420,24 1410,58 1395,58 C1380,58 1375,22 1355,22 
             C1335,22 1330,76 1310,76 C1290,76 1285,18 1265,18 
             C1245,18 1238,44 1220,44 C1202,44 1198,20 1175,20 
             C1155,20 1148,84 1125,84 C1102,84 1098,22 1075,22 
             C1055,22 1048,48 1030,48 C1012,48 1005,16 980,16 
             C955,16 948,70 925,70 C902,70 898,24 875,24 
             C855,24 845,50 825,50 C805,50 800,18 775,18 
             C750,18 742,90 715,90 C688,90 682,24 660,24 
             C640,24 632,56 610,56 C588,56 582,18 560,18 
             C538,18 530,78 505,78 C480,78 472,22 450,22 
             C430,22 422,48 400,48 C378,48 370,16 345,16 
             C320,16 312,86 285,86 C258,86 250,20 225,20 
             C202,20 195,54 175,54 C155,54 150,18 125,18 
             C102,18 95,72 70,72 C45,72 38,20 15,20 
             L0,20 Z"
          fill={fillColor}
          filter={`url(#dripShadow-${fillColor.replace(/[^a-zA-Z0-9]/g, '')})`}
        />

        {/* Subtle Liquid Highlight Reflection Lines (like fresh shiny melted chocolate/glaze) */}
        {withGloss && (
          <path
            d="M712,76 C714,79 716,84 715,86 
               M1122,70 C1124,74 1126,78 1125,80 
               M282,72 C284,76 286,80 285,82 
               M502,64 C504,68 506,72 505,74 
               M1307,62 C1309,66 1311,70 1310,72"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
}
