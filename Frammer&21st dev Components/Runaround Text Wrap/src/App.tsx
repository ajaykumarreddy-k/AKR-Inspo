import React from 'react';
import RunaroundTextWrap from './RunaroundTextWrap';
import userImage from '../F0gg5kHYD79EG2o1ClT6nqcGtfo.png';

export default function App() {
  const textContent = `There is a kind of silence in space that is difficult to imagine, not merely the absence of sound but the absence of confirmation, a silence stretching across distances so vast that even light takes years to carry the faintest hint of information from one place to another, and within this silence drift the planets, countless worlds tracing their paths around distant stars, each holding a story we cannot yet fully read, and for as long as we have known that such worlds exist a question has followed closely behind, are any of them alive, a question simple in form but immense in implication, because it asks whether life emerges easily wherever conditions allow or whether it is an exception so delicate that it has occurred only once or almost so in the vast expanse of the universe, and from a distance planets reveal very little, a faint dimming of starlight, a subtle shift in motion, a trace of atmospheric composition, these are the clues we gather as we study temperature ranges and orbital distances, defining regions where life might exist, but might remains the essential word, because a planet can appear promising and still be entirely silent, and most likely many of them are, and to consider a lifeless planet is to imagine a world governed only by physical processes where winds move, temperatures shift and landscapes evolve without awareness, and now imagine thousands or millions of such worlds, because this is the backdrop against which we search, and yet there is reason to continue, because we know at least once that life has emerged, here on Earth under uncertain conditions matter organized itself into forms that could persist and grow, and over time that process unfolded into extraordinary complexity, so the question is not whether life is possible but whether it is common, and every planet we observe becomes part of that question, each one expanding or narrowing our sense of what might be out there, but we do not yet have an answer, only probabilities and models, not certainty, and this uncertainty defines our understanding, because even if life exists elsewhere it may be too distant, too faint or too different for us to detect, and so the silence remains, but it is not empty, it invites interpretation, because each new discovery suggests that life could be there without confirming that it is, and this possibility becomes the space where imagination and science meet, where we begin to picture distant worlds that might host life, though these visions remain speculative, and in looking outward we inevitably turn inward, because if life is common then Earth is one of many living worlds, but if it is rare then Earth becomes something far more singular, and we do not yet know which is true, and that uncertainty carries weight, because for now Earth is the only confirmed example we have, the only place where matter has organized itself into systems capable of asking these questions, and while this does not make Earth central in the universe it does make it uniquely known, and that distinction matters, because the presence of life here is immediate and undeniable, shaping the atmosphere and surface in ways purely physical processes do not, and it exists within a narrow range of conditions, and this fragility becomes more apparent when viewed against other planets, worlds that are too extreme to sustain such balance, each one a reminder that life is not guaranteed, and so the search for life elsewhere becomes a mirror, because we are not just asking whether other planets are alive but what it means that this one is, and every new telescope and observation expands that question, yet answer remains just out of reach, and perhaps one day we will find clear evidence of life.`;

  return (
    <div style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      backgroundColor: '#ffffff',
      overflowX: 'hidden'
    }}>
      <div style={{
        marginTop: '60px',
        marginBottom: '20px',
        color: '#b89f78',
        fontFamily: '"Inter", sans-serif',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.4em',
        textTransform: 'uppercase'
      }}>
        Move the objects around + scroll
      </div>
      
      <div style={{ width: '100%', maxWidth: '1200px', height: '1200px', position: 'relative' }}>
        <RunaroundTextWrap 
          text={textContent}
          textColor="#555555"
          font={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "14px",
            lineHeight: "26px",
            fontWeight: 400
          }}
          textPadding={40}
          wrapPadding={24}
          alphaThreshold={10}
          sampleStep={2}
          debug={false}
          dragToMove={true}
          clipContent={false}
          style={{ width: '100%', height: '100%' }}
          images={[
            {
              image: { src: userImage },
              x: 100,
              y: 100,
              scale: 0.9
            }
          ]}
        />
      </div>
    </div>
  );
}
