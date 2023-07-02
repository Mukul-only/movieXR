import BlogPage from "../UI/BlogPage";
export const ParaText = (props) => {
  return (
    <p>
      <span className="text-lg font-semibold text-gray-300">{props.title}</span>
      {props.text}
    </p>
  );
};
const PrivacyPage = (props) => {
  return (
    <BlogPage heading="Privacy Policy">
      <ParaText
        title="Data Collection : "
        text=" moviexr does not collect any personal information from its users. We do not require registration, login, or any other form of user identification. You can browse and access our website anonymously."
      />
      <ParaText
        title="Cookies : "
        text=" We may use cookies on our website to enhance your browsing experience. These cookies are small text files stored on your device that help us improve the functionality and performance of our website. However, these cookies do not collect any personal information about you."
      />
      <ParaText
        title="Third-Party Links : "
        text=" Our website may contain links to third-party websites, such as external content providers. Please note that this Privacy Policy does not cover the privacy practices of these third-party websites. We encourage you to review the privacy policies of those websites before providing any personal information."
      />
      <ParaText
        title="Data Security : "
        text=" We take reasonable measures to protect your personal information, even though we do not collect any. We utilize industry-standard security protocols and technologies to safeguard our website and ensure that your browsing experience remains secure."
      />
      <ParaText
        title="Children's Privacy : "
        text="  Our website is not intended for use by individuals under the age of 18. We do not knowingly collect any personal information from children. If we become aware that personal information of a child has been unintentionally collected, we will take immediate steps to delete it from our servers."
      />
    </BlogPage>
  );
};
export default PrivacyPage;
