const message = (name) => {
  return `
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
<style>
body{
  background-color:#F6F6F6;
  font-family: 'Roboto Slab', serif;
}
.welcome-temp-container {
  width:90%;
  margin:0 auto;
  background-color:#fff;
  padding:4px 12px;
}
h4{
  text-align:left;
  margin:0
}
img{
  display:flex;
  margin:20px auto 0 auto;
  width:25%
}
hr{
	background-color:#333;
   margin:20px auto;
   width:50%
}
p{
	margin:0
}
 .section{
 	margin:20px 0
 }
 .footer-text{
 	text-align:center
 }

</style>
</head>
<body>

 <div class="welcome-temp-container">
 		<img src="https://sanetyzer.vercel.app/assets/logo.svg" />
        <hr />
        
            <h4>Dear ${name}!</h4> 
              <p>
            I'm super excited to welcome you in our
            small community. Thank you for subscribing and showing your
            interest. We hope to provide you with insightful content.
          </p>
          <div>
            
            <div class="section">
            <h4>About Sanetyzer</h4>
              <p>
                We are a group of like-minded people, coming together to provide
                you with the best sources to know, learn and become aware about
                mental health. 
                <br/><br/>
                Mental health has always been dear to us and this
                platform is our way of expressing ourselves with the hope to
                spread more knowledge about issues regarding psychology and
                mental health.
              </p>
            </div>
            <div class="section">
              <h4>How we came into being?</h4>
              <p>
                Mental health is not much talked about, even to this day. But we
                realize its importance and wanted to spread as much
                acknowledgment towards it, as possible and hence, The Sane Tyzer
                came into existence. It is founded by Vanshika Khurana who is a
                NLP practioner and a hypnotherapist based in Delhi, India. She
                as a practioner has always been passionate about psychology and
                mental health and hence, wanted more people with her in the
                journey to expand awareness on mental-health related issues and
                therefore, here we are.
              </p>
            </div>
            <div class="section">
              <h4>What do we do?</h4>
              <p>
                We set out to break the stigma, normalize seeking help and
                feeling what we all feel. We make content to spread as much
                awareness and information about mental health as possible. <br/> <br/>
                You
                can find insightful and creative blogs and articles on mental
                health and psychology, event updates for workshops to learn from
                and polish your knowledge, relatable and rib-tickling memes to
                make you grin, fun and exciting quizzes to keep you engaged. We
                also have movie reviews and analysis to make you gasp when you
                get to know the psychology behind it. We will show up in your
                Instagram feed with mental-health related content. We often
                collaborate with mental health professionals and other
                institutions to give you a variety of content. We also carry out
                campaigns related to mental health which you can be a part of.
                 <br/><br/>
                Our highest priority is to provide authentic knowledge and
                express our views about mental health and we hope to influence
                yours in the best way.
              </p>
            </div>
            <div class="section">
              <h4>Where else you can find us:</h4>
              <p>
                You can find our active presence on Instagram, Linked in and
                Facebook. We have our hearts and DMs opened up for everyone with
                a safe and trusted environment to be a part of and to say
                exactly what you feel.
              </p>
            </div>
            <h4 class="footer-text">
              Thank you so much for showing your faith in this community.
            </h4>
          </div>
        </div>

</body>
</html>
`;
};

module.exports = message;
