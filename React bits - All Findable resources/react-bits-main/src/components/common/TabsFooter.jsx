import { AiFillHeart } from 'react-icons/ai';
import FadeContent from '../../content/Animations/FadeContent/FadeContent';

const DemoFooter = () => {
  return (
    <FadeContent blur className="preview-footer">
      <p className="footer-description" style={{ opacity: 0.8 }}>
        Created with
        <AiFillHeart className="footer-heart" />
        Original project by{' '}
        <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noopener noreferrer" className="footer-creator-link cursor-target">
          David Haz (DavidHDev)
        </a>
      </p>
    </FadeContent>
  );
};

export default DemoFooter;
