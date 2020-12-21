import Head from "next/head";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = (props) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title></title>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        crossOrigin="anonymous"
      />
      <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
        integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
        crossOrigin="anonymous"
      ></script>
      {/* <!-- Main Quill library --> */}
      <script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
      <script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>

      {/* <!-- Theme included stylesheets --> */}
      <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
      <link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet" />

      {/* <!-- Core build with no theme, formatting, non-essential modules --> */}
      <link href="//cdn.quilljs.com/1.3.6/quill.core.css" rel="stylesheet" />
      <script src="//cdn.quilljs.com/1.3.6/quill.core.js"></script>
    </Head>
    <Navbar changeSection={props.changeSection} />
    {props.children}
    <Footer
      mentalhealthNumber={props.mentalhealthNumber}
      moviereviewNumber={props.moviereviewNumber}
      galleryfooter={props.galleryfooter}
    />
  </>
);

export default Layout;
