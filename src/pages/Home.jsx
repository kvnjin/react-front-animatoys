import './Home.css'
import homeImage from '../assets/dogandcat.png'
import TiltedCard from '../components/TiltedCard'
import BlurText from '../components/BlurText'
import ShinyText from '../components/ShinyText';
import AnimatedContent from '../components/AnimatedContent'
import bird from '../assets/bird.png'
import cat from '../assets/cat.png'
import dog from '../assets/dog.png'
import rabbit from '../assets/rabbit.png'
import { Link } from 'react-router-dom'

function Home() {
    const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
  return (
    <>
    <section className="home">
      <div className="home-left">
        <h1 className="home-title">
          <BlurText
            text="Loved Animals
            Happier Home"
            delay={50}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
            />
        </h1>
        <Link to="/produits">
        <button className="home-button">
            <ShinyText text="Découvrir" disabled={false} speed={3} className='custom-class' />
        </button>
        </Link>
      </div>
      <div className="home-right">
        <TiltedCard
            imageSrc={homeImage}
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="400px"
            imageWidth="400px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            displayOverlayContent={true}
            />
      </div>
    </section>
    <section className='categories'>
        <h1 className="categories-title">
            <BlurText
                text="Nos catégories"
                delay={100}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-8"
            />
        </h1>
        <div className="category-icons">
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={true}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.1}
            >
              <div>
                  <img src={bird}/>
              </div>
        </AnimatedContent>
        <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={true}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.4}
            >
                <div>
                    <img src={dog}/>
                </div>
        </AnimatedContent>
        <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={true}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.7}
            >
                <div>
                    <img src={cat}/>
                </div>
        </AnimatedContent>
        <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={true}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={1.0}
            >
                <div>
                    <img src={rabbit}/>
                </div>
        </AnimatedContent>
        </div>
        
      </section>
    </>
  )
}

export default Home
