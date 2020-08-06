import React from 'react';

export function Logo({
  className,
  color = '#111',
  style
}: {
  className?: string,
  color?: string
  style?: React.CSSProperties
}) {
  return (
    <svg style={style} className={className} width="1432px" height="237px" viewBox="0 0 1432 237" version="1.1">
      <title>Logo</title>
      <g id="assets" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Logo" fill={color}>
          <g id="Targum" transform="translate(805.000000, 6.000000)">
            <path d="M485.73838,67.2625796 C494.067867,70.3619404 498.23261,75.4850627 498.23261,82.6319465 L498.23261,154.401338 C498.23261,163.200099 496.65613,168.304565 493.50317,169.714737 C499.884219,180.483349 506.232759,185.867655 512.548788,185.867655 C518.864817,185.867655 526.142224,181.285007 534.38101,172.119712 L534.38101,159.549564 C526.761834,156.915231 522.952246,151.514738 522.952246,143.348086 L522.952246,73.5264598 L528.109102,70.6819726 L542.10646,79.4598824 L542.10646,157.26599 L538.112601,171.405243 C544.050253,181.046851 550.11885,185.867655 556.318393,185.867655 C562.517936,185.867655 569.844708,181.285007 578.298708,172.119712 L578.298708,159.549564 C570.686088,158.046386 566.879779,151.629006 566.879779,140.297422 L566.879779,72.7793283 C571.350639,72.6014113 575.156949,73.2571828 578.298708,74.7466428 C583.011347,76.9808327 585.952443,79.9672974 585.952443,91.4954542 L585.952443,160.792385 L583.013806,170.559194 C591.200884,180.764835 598.291016,185.867655 604.284199,185.867655 C610.277383,185.867655 617.602463,180.211603 626.25944,168.899499 C615.954743,166.134802 610.802394,157.933307 610.802394,144.295013 L610.802394,90.5534648 C610.802394,84.5799868 612.020598,80.5261535 614.457007,78.3919651 L614.457007,66.3368747 C602.463624,56.6214066 593.642834,51.7636726 587.994637,51.7636726 C582.346439,51.7636726 575.944079,56.6214066 568.787555,66.3368747 C556.820891,56.6214066 548.36203,51.7636726 543.410971,51.7636726 C538.459912,51.7636726 533.117112,55.6928704 527.38257,63.5512662 C519.512524,55.6928704 512.985684,51.7636726 507.80205,51.7636726 C502.618417,51.7636726 495.26386,56.9299749 485.73838,67.2625796 Z" id="M"></path>
            <path d="M395.240084,66.9903022 L395.240084,78.3618535 C401.525089,81.2125089 404.667592,85.9725323 404.667592,92.6419236 L404.667592,153.232246 C404.667592,159.745227 402.478624,164.155621 398.100688,166.463428 C407.505608,178.711501 416.050446,184.839045 423.735205,184.846062 C431.419963,184.853078 439.697768,178.186545 448.56862,164.846462 L448.56862,172.424855 C454.989605,181.87287 461.331332,186.55444 467.593801,186.469564 C473.856269,186.38315 481.12465,181.306041 489.398942,171.238237 C478.77896,168.055031 473.468969,162.388501 473.468969,154.238645 L473.468969,83.7349778 C473.468969,76.4357009 475.026347,70.7044345 478.141103,66.5411788 L460.346918,50.4573539 L438.931555,65.2633253 L438.931555,78.3618535 C445.356265,80.0531781 448.56862,85.2578922 448.56862,93.9759958 L448.56862,156.862016 C445.578374,160.658694 442.219319,162.587943 438.491454,162.649763 C434.763589,162.711583 431.798195,161.066049 429.595272,157.713161 L429.595272,84.6638082 C429.595272,77.8013957 431.249289,71.910227 434.557323,66.9903022 L416.558694,51.1532265 L395.240084,66.9903022 Z" id="U"></path>
            <path d="M354.809335,49.8333333 C361.63006,49.9098831 371.676219,55.5912658 384.947815,66.8774813 L384.947815,66.8774813 L384.947815,78.1669902 C383.664191,79.6957918 383.022379,81.7421283 383.022379,84.3059998 L383.022379,84.3059998 L383.022379,147.560783 C382.830937,162.914014 389.117142,175.388186 401.880994,184.983297 C396.622209,189.394472 389.944193,195.783869 381.846947,204.15149 C373.749701,212.519111 368.638634,218.406214 366.513746,221.812799 C359.095425,217.120099 349.498132,214.773749 337.721867,214.773749 C325.945603,214.773749 315.96294,219.590648 307.77388,229.224444 C305.766969,226.456594 304.679294,222.748838 304.510855,218.101177 C304.258197,211.129686 307.321463,201.615211 327.777771,196.136764 C341.41531,192.484466 356.344059,192.161002 372.564018,195.166372 C369.039122,190.429246 366.531257,186.683943 365.040422,183.930466 C363.549587,181.176988 361.093499,175.08079 357.672157,165.641872 C348.783553,178.210027 340.509478,184.657169 332.849931,184.983297 C325.190383,185.309425 316.399115,179.310642 306.476125,166.986948 C311.828263,165.857845 314.504331,160.636869 314.504331,151.32402 L314.504331,151.32402 L314.504331,76.4093252 C334.55361,58.6160978 347.988611,49.7574338 354.809335,49.8333333 Z M339.375436,73.2746757 L339.375436,161.635876 C341.631861,164.311959 344.485141,165.414646 347.935274,164.943938 C351.385408,164.47323 354.831193,162.511151 358.272629,159.057699 L358.272629,81.5178936 C354.01046,79.8797317 350.860928,78.6163898 348.824032,77.7278678 C346.787137,76.8393458 343.637605,75.3549484 339.375436,73.2746757 Z" id="G"></path>
            <path d="M230.394636,66.7000389 C237.961789,57.0271683 245.023743,52.190733 251.580499,52.190733 C258.137254,52.190733 264.490586,56.7727725 270.640493,65.9368516 C275.830505,56.8723905 281.396694,52.7269576 287.33906,53.5005529 C293.281426,54.2741482 301.452871,61.0414544 311.853394,73.8024715 L292.492285,91.3636829 C290.37194,86.3907788 287.114378,82.0768036 282.7196,78.4217572 C278.324821,74.7667108 273.753312,73.6833018 269.005071,75.1715302 L269.005071,150.584762 C269.005071,162.321042 278.279056,164.979351 282.7196,164.979351 C285.679962,164.979351 288.70341,163.846856 291.789943,161.581866 L294.827027,164.979351 C285.33586,179.076947 277.434856,186.181499 271.124015,186.293007 C264.813174,186.404516 254.528987,180.245903 240.271452,167.81717 C243.001351,165.925291 244.366301,159.91962 244.366301,149.800157 L244.366301,85.9451715 C244.366301,77.8234456 239.709079,71.4084014 230.394636,66.7000389 Z" id="R"></path>
            <path d="M188.734213,51.75 C193.894816,51.7731802 211.640501,60.123176 226.595993,68.2981183 L226.595993,68.2981183 L226.595993,76.1772 C224.107519,77.7782294 222.863281,80.0529909 222.863281,83.0014846 L222.863281,83.0014846 L222.863281,150.001635 C223.902928,154.523796 226.976573,158.105437 232.084215,160.746558 L232.084215,160.746558 L232.084215,172.893478 C221.651397,181.989429 214.836825,186.537405 211.640501,186.537405 C208.444176,186.537405 202.985035,181.989429 195.263079,172.893478 C188.519022,182.464746 182.12624,187.012722 176.084733,186.537405 C170.043226,186.062089 161.607855,180.119035 150.778618,168.708243 C155.578803,166.286151 157.978896,163.348823 157.978896,159.896257 L157.978896,159.896257 L157.978896,132.747504 C157.978896,123.235236 194.706977,114.386215 198.212279,101.328544 L198.212279,101.328544 L198.212279,66.567284 C195.075736,63.1103843 191.779369,60.9623483 188.323178,60.123176 L188.323178,60.123176 L188.323178,95.5203028 C182.448779,100.698371 174.273252,105.783884 163.796599,110.77684 L163.796599,110.77684 L163.796599,71.9536423 C176.981273,58.4691293 185.293811,51.7345818 188.734213,51.75 Z M197.966578,122.559163 L182.685216,132.61135 L182.685216,162.272016 C183.801204,164.511935 186.257158,165.628616 190.053081,165.62206 C193.849003,165.615465 196.486836,164.222171 197.966578,161.442176 L197.966578,122.559163 Z" id="A"></path>
            <path d="M161.455049,0 C149.511135,26.7310452 138.73048,42.4829111 129.113083,47.2555975 L129.113083,47.2555975 L129.113083,169.089433 C136.501067,167.836175 141.605288,166.756996 144.425747,165.851896 C135.292286,173.891224 127.57329,179.232273 121.268759,181.875043 C114.964228,184.517814 105.554477,186.69545 93.0395053,188.407952 C72.2012637,187.457496 54.2753506,181.371417 39.2617659,170.149714 C16.7413889,153.317161 9.98936963,131.941806 11.6341623,101.413612 C12.7306907,81.0614827 23.5569646,63.0088112 44.112984,47.2555975 L44.112984,47.2555975 L24.1339161,47.2555975 C10.5935285,47.2555975 2.54888979,54.759176 -8.52651283e-14,69.766333 L-8.52651283e-14,69.766333 L-8.52651283e-14,31.6151138 C-8.52651283e-14,19.5397499 8.43279483,12.9802552 15.6376285,12.9802552 L15.6376285,12.9802552 L114.840636,12.9802552 C139.091706,11.3261184 154.629843,6.99936671 161.455049,0 Z M123.852303,47.3467044 L114.70005,47.3467044 L114.70005,138.931769 L80.2856695,163.484913 C85.197489,166.626815 92.0615629,168.710602 100.877891,169.736275 C109.69422,170.761948 117.352357,170.761948 123.852303,169.736275 L123.852303,169.736275 L123.852303,47.3467044 Z M80.1493705,47.57237 L75.13661,47.57237 C53.39705,65.0184008 42.5619043,84.2452862 42.6311729,105.253026 C42.7008844,126.260766 52.3285274,144.633929 71.5141021,160.372514 L80.1493705,153.034306 L80.1493705,47.57237 Z" id="T"></path>
          </g>
          <g id="Daily" transform="translate(342.000000, 0.000000)">
            <path d="M356.776995,61.617797 C350.472393,61.617797 343.508814,66.3785917 335.886257,75.9001812 L335.886257,87.6022804 C341.34215,89.888846 344.515623,93.025264 345.406675,97.0115344 L345.406675,160.82142 C345.802115,168.892862 344.095182,174.830596 340.285875,178.634622 L359.238597,188.428166 C345.461167,195.981842 338.017079,203.222373 336.906334,210.149757 C335.240215,220.540834 337.933049,232.349404 352.208699,234.516115 C366.484349,236.682826 389.426386,222.967794 409.922561,223.327435 C423.586677,223.567196 430.934995,227.929442 431.967512,236.414174 C435.471228,224.785483 436.632353,216.62841 435.450886,211.942955 C433.678687,204.914773 430.32764,198.957063 405.12794,198.957063 C379.92824,198.957063 361.168302,220.558109 352.208699,220.315377 C343.249095,220.072645 345.830455,209.898985 349.457644,205.825138 C353.084834,201.751291 362.955634,194.072563 375.826156,190.633037 C384.406504,188.340019 397.090842,185.952476 413.879169,183.470408 L413.879169,93.7418509 C413.879169,89.3552576 415.486075,83.5369824 418.699886,76.2870251 C410.361858,66.5257497 404.432117,61.636007 400.910663,61.617797 C397.389209,61.5996603 390.319825,66.0845916 379.70251,75.072591 L379.70251,87.6022804 C385.667099,90.132419 388.857468,93.8695511 389.273616,98.8136769 L389.273616,177.961229 C380.308643,175.941715 373.857324,172.742555 369.919661,168.363751 L369.919661,92.7523414 C369.919661,86.9518468 371.416775,81.463408 374.411004,76.2870251 C368.959599,66.5075397 363.081596,61.617797 356.776995,61.617797 Z" id="Y"></path>
            <path d="M326.337979,10.4665659 C308.59577,13.5001829 299.724666,21.7645145 299.724666,35.2595609 L299.724666,163.37954 C299.724666,168.168766 298.264371,172.607966 295.343782,176.697142 C302.729048,186.496027 308.530926,191.468479 312.749417,191.614499 C316.967908,191.760519 324.009874,186.788066 333.875314,176.697142 L333.875314,165.471733 C328.850424,163.511397 325.597543,160.272156 324.116671,155.754009 L324.116671,32.4872691 C324.116671,26.4961281 324.857107,19.1558937 326.337979,10.4665659 Z" id="L"></path>
            <g id="I" transform="translate(234.680611, 22.935484)">
              <path d="M52.6585694,6.40811597 C46.8957972,0.427025367 40.9195325,-1.1055327 34.7297753,1.81044177 C28.5400182,4.72641624 17.1760085,12.8813145 0.637746397,26.2751367 C8.8119564,21.4580434 17.4820936,21.8222384 26.6481579,27.3677215 L52.6585694,6.40811597 Z" id="Path-6"></path>
              <path d="M32.4619732,33.3599212 C28.0340661,33.251288 21.0741077,37.9338552 11.5820981,47.4076226 L11.5820981,59.1518607 C17.8156429,61.9992669 20.9324153,65.6175258 20.9324153,70.0066375 L20.9324153,141.026153 C20.9324153,143.376445 19.4876485,147.168695 16.5981148,152.402902 C23.2451467,162.550576 28.9473992,167.725987 33.7048721,167.929133 C38.4623451,168.132279 45.6943003,163.451039 55.4007377,153.885414 L55.4007377,142.620968 C49.4527754,140.033959 46.2327791,136.115644 45.7407487,130.866022 L45.7407487,58.1230249 C46.1884142,54.33483 47.4212379,50.995009 49.4392199,48.1035619 C42.5489626,38.3831012 36.8898804,33.4685543 32.4619732,33.3599212 Z" id="Path-7"></path>
            </g>
            <path d="M200.617892,56.6060312 C205.776825,56.6291463 223.516767,64.95572 238.467419,73.1077312 L238.467419,73.1077312 L238.467419,80.9647116 C235.97975,82.5612501 234.735916,84.8296308 234.735916,87.7698538 L234.735916,87.7698538 L234.735916,154.582066 C235.775226,159.091542 238.847876,162.663136 243.953865,165.296848 L243.953865,165.296848 L243.953865,177.409695 C233.524423,186.480133 226.712057,191.015351 223.516767,191.015351 C220.321476,191.015351 214.864103,186.480133 207.144646,177.409695 C200.402771,186.954116 194.012058,191.489334 187.972506,191.015351 C181.932954,190.541368 173.500313,184.614984 162.674581,173.236201 C167.473212,170.820903 169.872528,167.891814 169.872528,164.448933 L169.872528,164.448933 L169.872528,137.376333 C169.872528,127.890747 206.588723,119.066548 210.092891,106.045505 L210.092891,106.045505 L210.092891,71.381752 C206.957363,67.934549 203.662062,65.7925384 200.20699,64.95572 L200.20699,64.95572 L200.20699,100.253556 C194.334492,105.4171 186.161612,110.488347 175.688349,115.467298 L175.688349,115.467298 L175.688349,76.7530012 C188.868756,63.3063129 197.178604,56.5906562 200.617892,56.6060312 Z M209.84727,127.216571 L194.570853,137.240561 L194.570853,166.818027 C195.686479,169.051663 198.141639,170.165212 201.936333,170.158675 C205.731027,170.152098 208.368006,168.762712 209.84727,165.990515 L209.84727,127.216571 Z" id="A"></path>
            <path d="M9.27421559,0 C11.7542264,11.2794034 17.51963,17.078075 26.5704263,17.3960147 L130.771145,17.3960147 C152.594835,17.3960147 157.971696,35.1185547 157.971696,49.7417438 L157.971696,166.390178 C158.005487,171.64176 154.898602,175.346882 148.651042,177.505542 C142.403482,179.664202 134.137593,182.022133 123.853375,184.579337 L123.853375,115.068107 C123.853375,108.348478 109.596491,104.025416 81.0827222,102.098919 L123.853375,102.098919 L123.853375,99.9415346 C123.853375,92.4158671 109.596491,88.0370047 81.0827222,86.8049475 L123.853375,86.2835576 L123.853375,67.9118446 C122.723066,60.1072901 117.974605,53.2021214 106.200334,52.1048267 L77.9315175,52.1048267 L77.9315175,153.164637 C85.2195413,154.281568 93.1221033,157.744708 101.639203,163.554059 C110.156303,169.36341 117.561027,176.371836 123.853375,184.579337 L85.0599919,192.839595 C76.1900835,183.006672 64.5805973,177.895321 50.2315333,177.505542 C35.8824693,177.115762 19.1386249,180.764622 0,188.45212 C14.9010014,173.744158 28.1685886,164.023584 39.8027615,159.290397 C51.4369345,154.557209 62.9712159,152.515289 74.4056059,153.164637 L74.4056059,52.1048267 C68.274898,55.4829839 64.9304416,59.759093 64.3722364,64.933154 L64.3722364,147.361043 C56.3479429,148.390653 50.3371794,149.498299 46.3399458,150.68398 C42.3427123,151.869661 36.3098985,154.738467 28.2415044,159.290397 L28.2415044,86.2724974 C28.2415044,73.320462 39.1336028,61.9312385 60.9177996,52.1048267 L23.7341248,52.1048267 C20.8191238,52.4634893 17.643849,51.1343087 14.2083003,48.1172851 C10.7727517,45.1002615 9.12805681,41.7519254 9.27421559,38.0722767 L9.27421559,0 Z" id="D"></path>
          </g>
          <g id="The" transform="translate(0.000000, 4.000000)">
            <path d="M267.829134,53.053783 C270.604499,52.3451713 276.48029,49.3294338 283.344306,54.7889387 C290.208322,60.2484437 298.201064,78.8062818 299.077699,82.5766285 C299.954334,86.3469753 299.077699,89.0314648 298.647218,90.7573002 C298.216738,92.4831356 293.447655,95.1590367 290.402121,97.9628503 C278.06564,109.320201 261.083617,112.89387 261.083617,124.05089 L261.083617,124.05089 L261.083617,144.395947 C261.083617,150.477864 267.490986,159.157605 280.892242,159.040656 C290.252015,158.958976 297.784404,154.912994 303.489411,146.902709 L303.489411,146.902709 L305.089819,146.902709 C304.917941,149.57534 304.520239,151.897992 303.89671,153.870664 C302.961418,156.829672 296.909179,169.797617 289.514551,178.612071 C282.119923,187.426525 277.854918,187.983592 268.598097,186.719069 C259.341275,185.454546 233.54287,161.516467 233.301012,160.43182 C235.459722,159.656222 236.539076,156.007711 236.539076,149.486287 L236.539076,149.486287 L236.539076,88.3048693 C235.737434,82.2337259 234.432753,78.9048724 232.625034,78.3183089 L232.625034,78.3183089 L232.625034,68.7837152 C254.24419,58.7695016 265.97889,53.5261908 267.829134,53.053783 Z M261.340919,71.358851 L261.340919,109.183412 L277.289051,97.000111 L261.340919,71.358851 Z" id="E"></path>
            <path d="M182.063023,5.05410851 C176.827526,5.25488722 171.536311,7.02480872 166.189379,10.363873 C158.168981,15.3724695 154.836878,20.0940505 154.836878,27.1117399 L154.836878,147.776398 C155.138565,161.757424 153.463468,169.960649 149.811587,172.38607 C155.537162,182.170206 161.699624,186.981855 168.298971,186.821017 C174.898318,186.660178 181.681029,182.247633 188.647106,173.583383 L188.647106,160.927442 C182.359706,160.20977 179.216006,155.550999 179.216006,146.95113 L179.216006,75.4622537 C180.982531,73.5275034 183.458915,72.6136487 186.64516,72.7206895 C189.831405,72.8277303 193.675352,75.2240722 198.177002,79.9097151 L198.177002,206.441209 C198.177002,210.119409 197.762524,212.699823 196.933569,214.182454 C205.073576,212.213764 211.082594,209.836102 214.960624,207.049467 C218.838653,204.262832 221.511652,200.373115 222.97962,195.380316 L222.97962,88.2622655 C222.97962,82.2760224 224.14731,78.9904306 226.482689,78.40549 L226.482689,68.821196 C213.518095,57.253481 204.833894,51.4919468 200.430087,51.5365934 C196.026281,51.5812399 188.95492,56.7851545 179.216006,67.148337 L179.216006,24.3218849 C179.216006,15.685134 180.165012,9.26254189 182.063023,5.05410851 Z" id="H"></path>
            <path d="M161.266664,0 C149.336687,26.6500055 138.56861,42.3541169 128.962435,47.1123341 L128.962435,47.1123341 L128.962435,168.57681 C136.341798,167.327351 141.440064,166.251444 144.257232,165.349088 C135.134428,173.364043 127.424439,178.6889 121.127264,181.323658 C114.830089,183.958416 105.431317,186.129451 92.9309475,187.836761 C72.1170198,186.889187 54.2120225,180.821559 39.2159556,169.633877 C16.7218552,152.852354 9.97771411,131.541802 11.6205876,101.106159 C12.7158366,80.815731 23.5294785,62.8177893 44.0615133,47.1123341 L44.0615133,47.1123341 L24.1057568,47.1123341 C10.581168,47.1123341 2.54591577,54.5931642 -8.52651283e-14,69.5548245 L-8.52651283e-14,69.5548245 L-8.52651283e-14,31.5192672 C-8.52651283e-14,19.4805118 8.4229555,12.9409033 15.6193826,12.9409033 L15.6193826,12.9409033 L114.70664,12.9409033 C138.929414,11.2917814 154.449422,6.97814694 161.266664,0 Z M123.707793,47.2031649 L114.566219,47.2031649 L114.566219,138.510573 L80.1919927,162.98928 C85.0980811,166.121657 91.9541461,168.199127 100.760188,169.221691 C109.566229,170.244254 117.215431,170.244254 123.707793,169.221691 L123.707793,169.221691 L123.707793,47.2031649 Z M80.0558527,47.4281463 L75.0489411,47.4281463 C53.3347466,64.8212865 42.5122433,83.9898823 42.5814311,104.933934 C42.6510613,125.877985 52.2674709,144.195446 71.4306599,159.886318 L80.0558527,152.570356 L80.0558527,47.4281463 Z" id="T"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function DT({
  className,
  color = '#111'
}: {
  className: string,
  color?: string
}) {
  return (
    <svg width="388px" height="345px" viewBox="0 0 388 345" version="1.1" className={className}>
        <title>DT</title>
        <g id="assets" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="splash" transform="translate(-427.000000, -1046.000000)" fill={color}>
                <g id="Group-2" transform="translate(427.000000, 1046.000000)">
                    <path d="M388,124 C373.944425,155.355157 361.25777,173.831885 349.940035,179.430182 L349.940035,179.430182 L349.940035,322.339636 C358.6342,320.869581 364.640838,319.603719 367.959949,318.542049 C357.211709,327.972073 348.12801,334.237052 340.708849,337.336986 C333.289689,340.43692 322.216311,342.991258 307.488716,345 C282.966312,343.885128 261.871131,336.746239 244.203173,323.583332 C217.701235,303.838972 209.755472,278.765968 211.69106,242.956806 C212.981453,219.084032 225.721792,197.90849 249.912077,179.430182 L249.912077,179.430182 L226.400747,179.430182 C210.466445,179.430182 200.999529,188.231779 198,205.834973 L198,205.834973 L198,161.084104 C198,146.919864 207.923697,139.225665 216.402332,139.225665 L216.402332,139.225665 L333.144245,139.225665 C361.682859,137.285385 379.968111,132.210163 388,124 Z M343.749158,179.537049 L332.978805,179.537049 L332.978805,286.965101 L292.480026,315.765609 C298.260246,319.451018 306.337875,321.895273 316.712914,323.098373 C327.087953,324.301474 336.100034,324.301474 343.749158,323.098373 L343.749158,323.098373 L343.749158,179.537049 Z M292.319629,179.801752 L286.420622,179.801752 C260.837549,200.265712 248.086769,222.81859 248.168285,247.460388 C248.250321,272.102185 259.580113,293.653658 282.157662,312.114808 L292.319629,303.507188 L292.319629,179.801752 Z" id="T"></path>
                    <path d="M10.9784117,0 C13.9141402,13.3944659 20.7389734,20.2804781 31.4529111,20.6580364 L154.801174,20.6580364 C180.635107,20.6580364 187,41.7038266 187,59.0690898 L187,197.590909 C187.04,203.827244 183.362205,208.227133 175.966617,210.790575 C168.571028,213.354017 158.786229,216.154098 146.61222,219.190816 L146.61222,136.645156 C146.61222,128.665493 129.735543,123.531789 95.9821881,121.244044 L146.61222,121.244044 L146.61222,118.682117 C146.61222,109.745271 129.735543,104.545304 95.9821881,103.082217 L146.61222,102.463059 L146.61222,80.6463654 C145.27421,71.3783363 139.653189,63.1783417 125.715321,61.8752873 L92.2519294,61.8752873 L92.2519294,181.885374 C100.879174,183.211747 110.233882,187.32428 120.316053,194.222974 C130.398225,201.121668 139.163614,209.444282 146.61222,219.190816 L100.690306,229 C90.1904958,217.323252 76.4476927,211.253444 59.461897,210.790575 C42.4761012,210.327706 22.6554689,214.660783 0,223.789806 C17.6391551,206.323874 33.3447458,194.780542 47.1167721,189.159809 C60.8887983,183.539076 74.5425773,181.114264 88.0781091,181.885374 L88.0781091,61.8752873 C80.8208447,65.8869011 76.8618231,70.9648468 76.2010442,77.1091243 L76.2010442,174.993517 C66.7022358,176.216195 59.5869562,177.531541 54.8552056,178.939556 C50.1234549,180.347571 42.9820732,183.754322 33.4310605,189.159809 L33.4310605,102.449924 C33.4310605,87.0691822 46.3246512,73.5443032 72.1118327,61.8752873 L28.0954212,61.8752873 C24.6447702,62.3012046 20.8860184,60.7227822 16.8191659,57.14002 C12.7523134,53.5572578 10.8053953,49.5810569 10.9784117,45.2114172 L10.9784117,0 Z" id="D"></path>
                </g>
            </g>
        </g>
    </svg>
  )
}

Logo.DT = DT;
export default Logo;