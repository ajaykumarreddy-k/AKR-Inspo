import { motion, useAnimation } from "framer-motion"

const springTransition = {
  damping: 30,
  delay: 0,
  mass: 1,
  stiffness: 400,
  type: "spring" as const,
}

const IMAGES = {
  bicycle:
    "https://framerusercontent.com/images/2PmD2a8aZpqpwXR4oh6GLdBuGF4.jpg",
  people:
    "https://framerusercontent.com/images/XRtn6dfktsxy35NgqRIPhTASUw.jpg",
  smartphone:
    "https://framerusercontent.com/images/La72ICnSDhn2r9An5ZNP6L1g.jpg",
}

function PieChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.957 12" width={12} height={12}>
      <path
        d="M 7.885 0.006 C 7.713 -0.019 7.538 0.033 7.407 0.15 C 7.275 0.267 7.2 0.437 7.2 0.615 L 7.2 4.265 C 7.2 4.605 7.469 4.88 7.8 4.88 L 11.358 4.88 C 11.532 4.88 11.697 4.802 11.811 4.668 C 11.925 4.533 11.976 4.354 11.951 4.177 C 11.647 2.016 9.992 0.319 7.885 0.006 Z"
        fill="rgb(155, 161, 165)"
      />
      <path
        d="M 5.4 0.923 C 2.418 0.923 0 3.403 0 6.462 C 0 9.52 2.418 12 5.4 12 C 8.382 12 10.8 9.52 10.8 6.462 C 10.8 6.122 10.531 5.846 10.2 5.846 L 6 5.846 L 6 1.538 C 6 1.199 5.731 0.923 5.4 0.923 Z"
        fill="rgb(155, 161, 165)"
      />
    </svg>
  )
}

function ClarisightLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124.548 20.191" width={126} height={21}>
      <path d="M 0 0 L 124.548 0.108 L 124.548 20.191 L 0 19.987 Z" fill="transparent" />
      <path d="M 21.727 0.914 C 25.301 2.317 27.49 5.929 27.069 9.729 C 26.648 13.528 23.722 16.572 19.928 17.157 L 7.873 19.812 C 7.809 19.815 7.747 19.787 7.708 19.735 C 7.67 19.684 7.66 19.617 7.681 19.557 L 8.799 17.589 C 8.866 17.453 8.738 17.295 8.562 17.355 L 0.207 19.972 C 0.144 19.993 0.074 19.969 0.037 19.914 C -0.001 19.859 0.003 19.786 0.046 19.735 L 5.896 13.458 C 5.993 13.331 5.969 13.155 5.777 13.155 L 3.383 13.006 C 3.237 13.006 3.179 12.833 3.301 12.702 L 12.288 3.124 C 14.664 0.495 18.432 -0.386 21.739 0.915 Z M 23.093 9.584 C 23.163 9.573 23.218 9.518 23.228 9.449 C 23.239 9.379 23.203 9.311 23.139 9.28 L 20.513 7.759 L 20.291 4.723 C 20.282 4.667 20.245 4.62 20.192 4.599 C 20.139 4.578 20.079 4.587 20.034 4.623 L 17.76 6.636 L 14.827 5.913 C 14.766 5.892 14.697 5.91 14.654 5.958 C 14.611 6.006 14.601 6.076 14.629 6.134 L 15.848 8.889 L 6.286 16.004 C 6.257 16.027 6.25 16.067 6.268 16.098 C 6.287 16.129 6.325 16.142 6.359 16.129 L 17.421 11.419 L 19.385 13.732 C 19.421 13.771 19.475 13.79 19.528 13.782 C 19.581 13.773 19.626 13.739 19.647 13.69 L 20.303 10.703 L 20.385 10.667 L 23.078 9.578 Z" fill="rgb(214,31,38)" />
      <path d="M 54.11 15.565 L 51.356 15.561 L 53.511 5.527 L 56.516 4.433 L 54.11 15.565" fill="rgb(214,31,38)" />
      <path d="M 46.692 12.734 C 46.676 12.821 46.667 12.909 46.665 12.998 C 46.665 13.445 46.97 13.606 47.789 13.607 C 48.594 13.59 49.393 13.459 50.161 13.219 L 50.161 15.27 C 49.206 15.563 48.211 15.707 47.211 15.697 C 44.938 15.694 43.851 15.085 43.851 13.028 C 43.851 10.971 44.792 7.879 48.412 7.883 C 50.714 7.885 51.399 8.92 51.399 10.014 C 51.399 11.424 50.176 12.62 46.698 12.743 Z M 48.199 9.815 C 47.538 9.814 47.16 10.358 47.007 10.984 C 48.312 10.985 48.706 10.582 48.706 10.244 C 48.697 10.12 48.639 10.004 48.543 9.923 C 48.448 9.841 48.324 9.802 48.199 9.812 Z M 59.113 7.533 C 58.174 7.532 57.584 6.924 57.584 6.109 C 57.559 5.656 57.731 5.214 58.055 4.894 C 58.379 4.574 58.825 4.408 59.281 4.436 C 60.238 4.437 60.826 5.045 60.826 5.848 C 60.856 6.305 60.686 6.752 60.361 7.076 C 60.035 7.399 59.585 7.567 59.125 7.537 Z" fill="rgb(214,31,38)" />
      <path d="M 57.18 8.142 L 60.018 8.146 L 58.584 15.459 L 55.718 15.454 L 56.727 10.321" fill="rgb(214,31,38)" />
      <path d="M 65.293 8.152 C 64.953 9.213 64.503 10.508 64.014 11.723 C 63.888 12.03 63.747 12.313 63.622 12.617 L 63.607 12.617 C 63.579 12.331 63.536 12.027 63.536 11.723 C 63.465 10.533 63.457 9.34 63.512 8.15 L 60.645 8.146 C 60.581 10.599 60.778 13.051 61.236 15.462 L 64.751 15.468 C 66.058 13.108 67.208 10.665 68.194 8.155 Z M 70.532 12.775 C 74.013 12.652 75.238 11.455 75.238 10.044 C 75.238 8.948 74.549 7.913 72.244 7.911 C 68.616 7.906 67.676 11.001 67.676 13.06 C 67.676 15.119 68.766 15.729 71.043 15.732 C 72.044 15.741 73.039 15.597 73.995 15.305 L 73.995 13.251 C 73.226 13.492 72.426 13.623 71.619 13.64 C 70.802 13.639 70.495 13.478 70.495 13.031 C 70.499 12.942 70.509 12.853 70.526 12.766 Z M 72.035 9.842 C 72.16 9.831 72.284 9.871 72.38 9.952 C 72.475 10.034 72.533 10.15 72.541 10.274 C 72.541 10.612 72.149 11.016 70.838 11.014 C 70.994 10.388 71.377 9.844 72.035 9.845 Z M 80.751 10.753 C 80.751 10.753 80.751 10.753 80.751 10.753 L 80.745 10.775 Z M 80.751 10.753 L 81.533 7.995 C 81.316 7.949 81.095 7.93 80.874 7.939 C 80.071 7.938 79.551 8.345 78.889 9.154 L 78.818 8.177 L 76.674 8.174 L 75.238 15.492 L 78.108 15.496 L 78.696 12.455 C 78.923 11.296 79.428 10.666 80.062 10.667 C 80.294 10.671 80.525 10.7 80.751 10.753 Z M 89.709 8.168 L 86.834 8.165 C 86.48 9.374 86.061 10.563 85.58 11.727 C 85.452 12.053 85.314 12.336 85.185 12.64 C 85.158 12.332 85.118 12.022 85.118 11.702 C 85.043 10.525 85.034 9.344 85.09 8.166 L 82.21 8.163 C 82.179 10.761 82.449 13.516 82.997 15.485 C 82.672 15.917 82.464 16.114 81.971 16.113 L 80.987 16.112 L 80.537 18.223 C 80.893 18.372 81.275 18.449 81.661 18.45 C 83.144 18.452 84.578 17.895 86.209 15.481 C 87.334 13.839 88.459 11.451 89.728 8.181 Z" fill="rgb(214,31,38)" />
      <path d="M 100.772 15.52 L 97.741 15.516 L 98.459 11.826 L 95.894 11.823 L 95.176 15.512 L 92.15 15.508 L 94.063 5.753 L 97.093 5.757 L 96.403 9.239 L 98.968 9.242 L 99.658 5.759 L 102.686 5.763 L 100.772 15.52" fill="rgb(214,31,38)" />
      <path d="M 105.237 12.813 C 105.221 12.9 105.211 12.989 105.209 13.078 C 105.209 13.526 105.516 13.688 106.336 13.689 C 107.144 13.671 107.946 13.54 108.718 13.299 L 108.718 15.355 C 107.759 15.648 106.759 15.793 105.756 15.783 C 103.472 15.78 102.38 15.169 102.38 13.108 C 102.38 11.046 103.325 7.947 106.959 7.951 C 109.271 7.954 109.964 8.99 109.964 10.087 C 109.964 11.5 108.736 12.699 105.24 12.822 Z M 106.747 9.888 C 106.084 9.887 105.706 10.432 105.55 11.059 C 106.861 11.061 107.257 10.656 107.257 10.318 C 107.248 10.193 107.189 10.077 107.093 9.996 C 106.997 9.914 106.873 9.874 106.747 9.885 Z M 115.486 10.798 C 115.26 10.744 115.028 10.715 114.795 10.712 C 114.162 10.711 113.652 11.341 113.428 12.501 L 112.836 15.547 L 109.961 15.543 L 111.398 8.215 L 113.548 8.218 L 113.622 9.196 C 114.285 8.386 114.804 7.979 115.609 7.98 C 115.833 7.97 116.057 7.989 116.276 8.035 L 115.483 10.819 Z M 119.151 15.797 C 116.908 15.794 115.809 14.841 115.809 12.937 C 115.809 10.823 116.865 7.957 120.592 7.961 C 122.823 7.964 123.936 8.943 123.936 10.821 C 123.936 12.976 122.876 15.799 119.151 15.794 Z M 118.755 12.743 C 118.755 13.371 119.022 13.554 119.548 13.555 C 120.688 13.556 120.986 11.807 120.986 11.012 C 120.986 10.403 120.734 10.213 120.224 10.213 C 119.065 10.211 118.755 11.96 118.755 12.743 Z M 40.375 8.162 L 43.148 7.163 C 43.521 7.765 43.704 8.465 43.673 9.172 C 43.673 12.368 41.908 15.434 37.492 15.428 L 33.706 15.422 L 35.599 5.684 L 39.241 5.688 C 40.515 5.689 41.535 5.894 42.28 6.341 Z M 37.699 13.113 C 39.48 13.116 40.561 11.583 40.561 9.642 C 40.561 8.682 40.127 7.979 38.936 7.978 L 38.148 7.977 L 37.141 13.11 L 37.702 13.11 Z" fill="rgb(214,31,38)" />
    </svg>
  )
}

export default function CaseStudyCard() {
  const controls = useAnimation()

  const handleMouseEnter = () => controls.start("hover")
  const handleMouseLeave = () => controls.start("default")

  return (
    <div
      className="relative h-[376px] w-[292px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Card container - absolute inset 0, flex column centering children */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-[10px]"
        style={{ transformStyle: "preserve-3d", perspective: 1500 }}
      >
        {/* Front Face - relative, in-flow, defines the 3D card dimensions */}
        <motion.div
          className="relative flex w-[292px] flex-none flex-col items-start justify-start gap-[68px] overflow-clip rounded-2xl p-[30px] will-change-transform"
          style={{
            height: 376,
            backgroundColor: "rgb(236, 242, 238)",
            transformOrigin: "0 100%",
            transformStyle: "preserve-3d",
            zIndex: 4,
          }}
          variants={{
            default: { rotateY: -1 },
            hover: { rotateY: -35 },
          }}
          initial="default"
          animate={controls}
          transition={springTransition}
        >
          {/* Bicycle image */}
          <img
            src={IMAGES.bicycle}
            alt="man riding a bicycle"
            className="absolute select-none"
            style={{
              borderRadius: 8,
              objectFit: "cover",
              width: 74,
              height: 58,
              left: "calc(68.49315068493152% - 37px)",
              top: "calc(31.117021276595768% - 29px)",
              zIndex: 1,
            }}
          />
          {/* People image */}
          <img
            src={IMAGES.people}
            alt="people laughing and talking outside during daytime"
            className="absolute select-none"
            style={{
              borderRadius: 8,
              objectFit: "cover",
              width: 32,
              height: 53,
              right: 40,
              top: "calc(47.87234042553194% - 26.5px)",
              zIndex: 1,
            }}
          />
          {/* Smartphone image */}
          <img
            src={IMAGES.smartphone}
            alt="black smartphone"
            className="absolute select-none"
            style={{
              borderRadius: 8,
              objectFit: "cover",
              width: 27,
              height: 29,
              right: 61,
              bottom: 132,
              zIndex: 1,
            }}
          />
          {/* Content */}
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-min items-center gap-1 overflow-clip">
              <PieChartIcon />
              <span
                className="whitespace-pre select-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "rgb(155, 161, 165)",
                }}
              >
                CASE STUDY
              </span>
            </div>
            <div className="flex w-min items-center gap-[10px] overflow-clip">
              <div
                className="whitespace-pre select-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 24,
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.3,
                  color: "rgb(190, 52, 51)",
                }}
              >
                <p>How Delivery Hero</p>
                <p>streamlines</p>
                <p>marketing</p>
                <p>reporting across</p>
                <p>all their brands</p>
                <p>with Clarisights</p>
              </div>
            </div>
          </div>
          {/* Logo */}
          <ClarisightLogo />
        </motion.div>

        {/* Card (red side label) - absolute, positioned relative to 3D container */}
        <motion.div
          className="absolute flex flex-none flex-col items-end justify-center overflow-visible rounded-2xl"
          style={{
            backgroundColor: "rgb(190, 52, 51)",
            width: 265,
            height: 318,
            left: "calc(50% - 132.5px)",
            top: "calc(50% - 159px)",
            transformOrigin: "0 100%",
            transformStyle: "preserve-3d",
            zIndex: 3,
          }}
          variants={{
            default: { rotate: 0 },
            hover: { rotate: 4 },
          }}
          initial="default"
          animate={controls}
          transition={springTransition}
        >
          <div
            className="absolute flex flex-col items-center justify-start"
            style={{ right: -21, top: "21%" }}
          >
            <div
              className="whitespace-pre select-none"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "rgb(255, 255, 255)",
                rotate: "-90deg",
              }}
            >
              CLICK TO READ
            </div>
          </div>
        </motion.div>

        {/* Back Face - absolute, positioned behind the front */}
        <div
          className="absolute flex flex-none flex-col items-start justify-center gap-4 overflow-hidden p-5"
          style={{
            backgroundColor: "rgb(211, 218, 205)",
            width: 292,
            height: 376,
            left: 0,
            top: "calc(50% - 188px)",
            transformStyle: "preserve-3d",
            zIndex: 2,
            borderRadius: 16,
          }}
        >
          <div className="flex w-full items-center justify-center gap-[10px] overflow-clip">
            <p
              className="flex-1 select-none text-justify"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "rgb(155, 161, 165)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                lineHeight: 1.4,
              }}
            >
              How Delivery Hero streamlines marketing reporting across all their
              brands with Clarisights. How Delivery Hero streamlines marketing
              reporting across all their brands with Clarisights. How Delivery
              Hero streamlines marketing reporting across all their brands with
              Clarisights. How Delivery Hero streamlines marketing reporting
              across all their brands with Clarisights. How Delivery Hero
              streamlines marketing reporting across all their brands with
              Clarisights. How Delivery Hero streamlines marketing reporting
              across all their brands with Clarisights. How Delivery Hero
              streamlines marketing reporting across all their brands with
              Clarisights. How Delivery Hero streamlines marketing reporting
              across all their brands with Clarisights. How Delivery Hero
              streamlines marketing reporting across all their brands with
              Clarisights. How Delivery Hero streamlines marketing reporting
              across all their brands with Clarisights. How Delivery Hero
              streamlines marketing reporting across all their brands with
              Clarisights
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
