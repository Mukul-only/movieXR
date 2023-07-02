import BlogPage from "../UI/BlogPage";
import { ParaText } from "./PrivacyPage";
const TermsPage = (props) => {
  return (
    <BlogPage heading="Terms Of Service">
      <ParaText
        title="Content Ownership : "
        text="All the download links and movies data provided on moviexr are gathered from third-party providers. We do not claim ownership of any of the content available on our website. We act solely as a platform to aggregate and organize this content for user convenience."
      />
      <ParaText
        title="Third-Party Providers :"
        text=" moviexr relies on external sources to obtain the download links and movies data. We cannot guarantee the accuracy, reliability, or availability of these third-party sources. Any issues, concerns, or disputes related to the content must be addressed with the respective providers."
      />
      <ParaText
        title="Copyright Infringement : "
        text=" moviexr respects the intellectual property rights of others. If you believe that any content available on our website infringes upon your copyrights, please contact us immediately with the relevant details, and we will take appropriate action in accordance with applicable laws."
      />
      <ParaText
        title="User Responsibility :"
        text=" Users of moviesxr are solely responsible for their actions and the way they utilize the content provided. It is essential to comply with the copyright laws and terms of use of the respective content providers when accessing or downloading any materials from our website."
      />
      <ParaText
        title="Disclaimer of Liability :"
        text="moviesxr does not assume any responsibility for the accuracy, legality, or quality of the content available on our platform. We are not liable for any damages, losses, or liabilities arising from the use of the downloaded files or any issues related to the content provided by third-party sources."
      />
      <ParaText
        title="Modification of Terms : "
        text=" We reserve the right to modify or update these terms of service at any time without prior notice. It is your responsibility to review the terms periodically. Continued use of moviesxr after any modifications indicates your acceptance of the revised terms."
      />
    </BlogPage>
  );
};
export default TermsPage;
