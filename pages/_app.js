import "../styles/globals.css";
import "../components/Navbar/Navbar.css";
import "../components/Hero/Hero.css";
import "../components/CategoryBlogs/CategoryBlog.css";
import "../components/RecentPosts/RecentPosts.css";
import "../index.css";
import "../components/QuizCards/QuizCards.css";
import "../components/Footer/Footer.css";
import "../css/singleBlog.css";
import "../components/SingleBlogContent/SingleBlogContent.css";
import "../components/AdminNavbar/AdminNavbar.css";
import "../components/AdminBlog/AdminBlog.css";
import "../components/AdminEvents/AdminEvents.css";
import "../css/blogs.css";
import "../css/gallery.css";
import "../css/events.css";
import "../components/AdminQuiz/AdminQuiz.css";
import "../components/SingleQuizContent/SingleQuizContent.css";
import "../css/about.css";
import "../components/AdminFounder/AdminFounder.css";
import "../components/AdminLogin/AdminLogin.css";
import "../css/search.css";

import "react-quill/dist/quill.snow.css";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
