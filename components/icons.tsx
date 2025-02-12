import * as React from "react";
import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns=""
  >
    <path
      d="M41.1831 24.423C40.7831 23.623 40.2831 22.823 39.8831 21.923C40.9831 20.023 41.8831 18.123 42.6831 16.123C44.7831 10.223 44.3831 5.423 41.4831 2.523C38.5831 -0.377 33.6831 -0.777 27.7831 1.323C25.7831 2.023 23.7831 3.023 21.9831 4.123C14.0831 -0.577001 6.58309 -1.477 2.58309 2.623C-1.41691 6.723 -0.616904 14.023 4.0831 21.923C3.6831 22.623 3.28309 23.223 2.98309 23.923C-0.716907 31.123 -1.11691 37.623 2.58309 41.323C4.48309 43.123 6.98309 44.023 9.48309 43.923C13.0831 43.823 16.5831 42.823 19.7831 41.023C21.4831 40.123 23.0831 39.223 24.5831 38.123C27.2831 36.223 29.6831 34.223 31.9831 31.923C33.1831 30.723 34.3831 29.423 35.4831 28.123C35.9831 27.623 36.3831 27.023 36.7831 26.423C37.1831 27.223 37.5831 28.123 37.8831 29.023C37.8831 29.123 37.9831 29.223 37.9831 29.423C38.5831 31.023 38.9831 32.723 38.9831 34.423C39.0831 35.623 38.6831 36.923 37.8831 37.823C36.3831 39.323 33.2831 39.323 29.3831 37.923C29.2831 37.923 29.0831 37.823 28.9831 37.823C28.0831 38.523 27.1831 39.223 26.3831 39.823C25.6831 40.323 25.0831 40.723 24.3831 41.123C25.4831 41.723 26.5831 42.123 27.7831 42.623C29.8831 43.423 32.1831 43.923 34.4831 43.923C35.7831 43.923 37.0831 43.723 38.3831 43.323C39.4831 42.923 40.5831 42.223 41.3831 41.423C44.2831 38.523 44.7831 33.623 42.5831 27.823C42.1831 26.623 41.7831 25.523 41.1831 24.423ZM29.4831 5.923C33.2831 4.523 36.4831 4.523 37.9831 6.023C39.4831 7.523 39.4831 10.623 38.0831 14.523C37.6831 15.523 37.2831 16.523 36.7831 17.423C35.2831 15.523 33.6831 13.723 31.9831 11.923C30.8831 10.823 29.6831 9.723 28.4831 8.723C27.7831 8.123 27.1831 7.623 26.4831 7.123C27.4831 6.723 28.4831 6.223 29.4831 5.923ZM5.98309 37.923C4.38309 36.323 4.48309 32.923 6.18309 28.723C6.48309 28.023 6.78309 27.323 7.18309 26.523C7.68309 27.223 8.28309 27.923 8.88309 28.523C9.88309 29.623 10.8831 30.823 11.9831 31.923C13.6831 33.623 15.4831 35.223 17.3831 36.723C16.5831 37.123 15.8831 37.423 15.0831 37.723C10.9831 39.423 7.58309 39.523 5.98309 37.923ZM28.4831 28.523C26.4831 30.523 24.2831 32.423 21.8831 34.023C17.8831 31.223 14.3831 27.923 11.3831 24.023C10.7831 23.323 10.2831 22.623 9.88309 21.923C11.4831 19.623 13.3831 17.423 15.3831 15.323C16.8831 13.823 18.3831 12.523 20.0831 11.223C18.5831 10.223 17.0831 9.323 15.4831 8.623C14.2831 9.623 13.0831 10.723 11.9831 11.823C10.2831 13.523 8.68309 15.323 7.18309 17.223C4.58309 12.023 4.18309 7.723 5.98309 5.823C6.88309 5.023 8.18309 4.623 9.38309 4.723C13.9831 4.723 21.5831 8.323 28.4831 15.223C30.4831 17.223 32.3831 19.423 33.9831 21.723C33.5831 22.323 33.1831 22.923 32.6831 23.523C31.3831 25.423 29.9831 27.023 28.4831 28.523Z"
      fill="black"
    />
    <path
      d="M23.1255 26.5572C25.6333 26.1502 27.3362 23.7873 26.9293 21.2796C26.5223 18.7719 24.1594 17.0689 21.6517 17.4758C19.1439 17.8828 17.441 20.2457 17.8479 22.7534C18.2549 25.2612 20.6178 26.9642 23.1255 26.5572Z"
      fill="black"
    />
  </svg>
);

export const DiscordIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const MailIcon: React.FC<IconSvgProps> = (props) => {
  const { width, height = 40 } = props;
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height}
      role="presentation"
      viewBox="0 0 24 24"
      width={width}
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GoogleIcon: React.FC<IconSvgProps> = (props) => {
  const { width, height = 40 } = props;

  return (
    <svg
      viewBox="0 0 21 20"
      fill="none"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_13183_10121)">
        <path
          d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
          fill="#3F83F8"
        />
        <path
          d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
          fill="#34A853"
        />
        <path
          d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
          fill="#FBBC04"
        />
        <path
          d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_13183_10121">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FacebookIcon: React.FC<IconSvgProps> = (props) => {
  const { width, height = 40 } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={width}
      height={height}
    >
      <linearGradient
        id="Ld6sqrtcxMyckEl6xeDdMa"
        x1="9.993"
        x2="40.615"
        y1="9.993"
        y2="40.615"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#2aa4f4" />
        <stop offset="1" stop-color="#007ad9" />
      </linearGradient>
      <path
        fill="url(#Ld6sqrtcxMyckEl6xeDdMa)"
        d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
      />
      <path
        fill="#fff"
        d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
      />
    </svg>
  );
};

export const LocationIcon: React.FC<IconSvgProps> = (props) => {
  return (
    <svg
      width="37"
      height="45"
      viewBox="0 0 37 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.3001 24.4083C21.7933 24.4083 24.6251 21.5765 24.6251 18.0833C24.6251 14.5901 21.7933 11.7583 18.3001 11.7583C14.8069 11.7583 11.9751 14.5901 11.9751 18.0833C11.9751 21.5765 14.8069 24.4083 18.3001 24.4083Z"
        stroke="black"
        stroke-opacity="0.67"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.3 1.21655C13.8267 1.21655 9.53659 2.99357 6.37348 6.15668C3.21037 9.3198 1.43335 13.6099 1.43335 18.0832C1.43335 22.0722 2.2809 24.6823 4.59585 27.5707L18.3 43.3832L32.0042 27.5707C34.3191 24.6823 35.1667 22.0722 35.1667 18.0832C35.1667 13.6099 33.3897 9.3198 30.2265 6.15668C27.0634 2.99357 22.7733 1.21655 18.3 1.21655V1.21655Z"
        stroke="black"
        stroke-opacity="0.67"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const StarIcon: React.FC<IconSvgProps> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="#FFC700"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3.0531 15.2886L4.2931 9.97561L0.170105 6.40361L5.60111 5.93361L7.72811 0.922607L9.8551 5.93261L15.2851 6.40261L11.1631 9.97461L12.4031 15.2876L7.72811 12.4676L3.0531 15.2886Z" />
    </svg>
  );
};

export const DotIcon: React.FC<IconSvgProps> = (props) => {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
};

export const IMEIcon: React.FC<IconSvgProps> = (props) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.65034 13.846C5.74181 15.0539 4.53188 17.1072 4.39984 19.362V40.638C4.53188 42.8928 5.74181 44.946 7.65034 46.154L26.7396 56.8314C28.7902 57.8361 31.1901 57.8361 33.2406 56.8314L52.3496 46.154C54.2582 44.946 55.4681 42.8928 55.6001 40.638V19.362C55.4681 17.1072 54.2582 15.0539 52.3496 13.846L33.2603 3.16858C31.2098 2.16386 28.8099 2.16386 26.7593 3.16858L7.65034 13.846Z"
        fill="white"
      />
      <path
        d="M49.6114 24.7205C39.0128 24.7205 31.0934 33.5067 31.0934 44.2826V44.7357H28.9658V44.2826C28.9658 33.5067 21.0858 24.7599 10.4081 24.7205C10.4081 25.3903 10.4081 26.0798 10.4081 26.6905C10.3653 34.8427 15.3924 42.1635 23.0164 45.0509C25.2819 45.8816 27.6756 46.3083 30.0887 46.3117C32.521 46.3083 34.9341 45.8817 37.2201 45.0509C44.8326 42.1524 49.8488 34.836 49.8086 26.6905C49.7099 26.0601 49.6705 25.3903 49.6114 24.7205Z"
        fill="#2B2B2B"
      />
      <path
        d="M30.0099 25.5478C33.2739 25.5478 35.9199 22.9018 35.9199 19.6378C35.9199 16.3738 33.2739 13.7278 30.0099 13.7278C26.7459 13.7278 24.0999 16.3738 24.0999 19.6378C24.0999 22.9018 26.7459 25.5478 30.0099 25.5478Z"
        fill="#2B2B2B"
      />
    </svg>
  );
};

export const PhoneIcon: React.FC<IconSvgProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.43 15.45 5.5 14.36 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95Z"
        fill="currentColor"
      />
      <path
        d="M21.9696 18.3291C21.9696 18.6091 21.9196 18.8991 21.8196 19.1791C21.7896 19.2591 21.7596 19.3391 21.7196 19.4191C21.5496 19.7791 21.3296 20.1191 21.0396 20.4391C20.5496 20.9791 20.0096 21.3691 19.3996 21.6191C19.3896 21.6191 19.3796 21.6291 19.3696 21.6291C18.7796 21.8691 18.1396 21.9991 17.4496 21.9991C16.4296 21.9991 15.3396 21.7591 14.1896 21.2691C13.0396 20.7791 11.8896 20.1191 10.7496 19.2891C10.3596 18.9991 9.96961 18.7091 9.59961 18.3991L12.8696 15.1291C13.1496 15.3391 13.3996 15.4991 13.6096 15.6091C13.6596 15.6291 13.7196 15.6591 13.7896 15.6891C13.8696 15.7191 13.9496 15.7291 14.0396 15.7291C14.2096 15.7291 14.3396 15.6691 14.4496 15.5591L15.2096 14.8091C15.4596 14.5591 15.6996 14.3691 15.9296 14.2491C16.1596 14.1091 16.3896 14.0391 16.6396 14.0391C16.8296 14.0391 17.0296 14.0791 17.2496 14.1691C17.4696 14.2591 17.6996 14.3891 17.9496 14.5591L21.2596 16.9091C21.5196 17.0891 21.6996 17.2991 21.8096 17.5491C21.9096 17.7991 21.9696 18.0491 21.9696 18.3291Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const UserIcon: React.FC<IconSvgProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
        fill="currentColor"
      />
      <path
        d="M17.0809 14.1489C14.2909 12.2889 9.74094 12.2889 6.93094 14.1489C5.66094 14.9989 4.96094 16.1489 4.96094 17.3789C4.96094 18.6089 5.66094 19.7489 6.92094 20.5889C8.32094 21.5289 10.1609 21.9989 12.0009 21.9989C13.8409 21.9989 15.6809 21.5289 17.0809 20.5889C18.3409 19.7389 19.0409 18.5989 19.0409 17.3589C19.0309 16.1289 18.3409 14.9889 17.0809 14.1489Z"
        fill="currentColor"
      />
    </svg>
  );
};
