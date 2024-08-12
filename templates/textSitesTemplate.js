/**
 * Generates HTML content for the legal notice heading.
 * @returns {string} The HTML content for the legal notice heading.
 */
function legalNoticeH1Html() {
  return /*html*/ `
        <h1 class="h1-text-sites">Legal Notice</h1>
        <a href="./summary.html">
          <div class="arrowContainer" id="arrowContainer">
            <img
              src="./assets/img/icons/blueArrowLeft.svg"
              class="arrowLeftIconPrivacyPolicy"
              onClick="history.go(-1); return false;"
              id="arrowLeft"
            />
          </div>
        </a>
    `;
}

function legalNoticeHtmlMain() {
  return /*html*/ `
      <h2 class="h2-text-sites">Imprint</h2>
      <p class="p-text-sites">Christian Grund<br>Fritz-Tröndle-Str. 6a<br>77704 Oberkirch</p>
      
      <h2 class="h2-text-sites">Exploring the Board</h2>
      <p class="p-text-sites">
        Email:
        <a href="mailto:christian.grund@outlook.de"><span class="span-blue">christian.grund@outlook.de</span></a>
      </p>
      <h2 class="h2-text-sites">Acceptance of terms</h2>
      <p class="p-text-sites">
        By accessing and using <span class="span-blue">Join</span> (Product), you
        acknowledge and agree to the following terms and conditions, and any
        policies, guidelines, or amendments thereto that may be presented to you
        from time to time. We, the listed students, may update or change the
        terms and conditions from time to time without notice.
      </p>
      <h2 class="h2-text-sites">Scope and ownership of the product</h2>
      <p class="p-text-sites">
        <span class="span-blue">Join</span> has been developed as part of a student
        group project in a web development bootcamp at the
        <span class="span-blue">Developer Akademie GmbH</span>. It has an educational
        purpose and is not intended for extensive personal & business usage. As
        such, we cannot guarantee consistent availability, reliability,
        accuracy, or any other aspect of quality regarding this Product.
        <br /><br />
        The design of <span class="span-blue">Join</span> is owned by the
        <span class="span-blue">Developer Akademie GmbH</span>. Unauthorized use,
        reproduction, modification, distribution, or replication of the design
        is strictly prohibited.
      </p>
      <h2 class="h2-text-sites">Proprietary rights</h2>
      <p class="p-text-sites">
        Aside from the design owned by
        <span class="span-blue">Developer Akademie GmbH</span>, we, the listed
        students, retain all proprietary rights in
        <span class="span-blue">Join</span>, including any associated copyrighted
        material, trademarks, and other proprietary information.
      </p>
      <h2 class="h2-text-sites">Use of the product</h2>
      <p class="p-text-sites">
        <span class="span-blue">Join</span> is intended to be used for lawful
        purposes only, in accordance with all applicable laws and regulations.
        Any use of <span class="span-blue">Join</span> for illegal activities, or to
        harass, harm, threaten, or intimidate another person, is strictly
        prohibited. You are solely responsible for your interactions with other
        users of <span class="span-blue">Join</span>.
      </p>
      <h2 class="h2-text-sites">Disclaimer of warranties and limitation of liability</h2>
      <p class="p-text-sites">
        <span class="span-blue">Join</span> is provided "as is" without warranty of
        any kind, whether express or implied, including but not limited to the
        implied warranties of merchantability, fitness for a particular purpose,
        and non-infringement. In no event will we, the listed students, or the
        <span class="span-blue">Developer Akademie</span>, be liable for any direct,
        indirect, incidental, special, consequential or exemplary damages,
        including but not limited to, damages for loss of profits, goodwill,
        use, data, or other intangible losses, even if we have been advised of
        the possibility of such damages, arising out of or in connection with
        the use or performance of <span class="span-blue">Join</span>.
      </p>
      <h2 class="h2-text-sites">Indemnity</h2>
      <p class="p-text-sites">
        You agree to indemnify, defend and hold harmless me, the listed
        students, the <span class="span-blue">Developer Akademie</span>, and our
        affiliates, partners, officers, directors, agents, and employees, from
        and against any claim, demand, loss, damage, cost, or liability
        (including reasonable legal fees) arising out of or relating to your use
        of <span class="span-blue">Join</span> and/or your breach of this Legal
        Notice. <br /><br />
        For any questions or notices, please contact me at
        <a href="mailto:christian.grund@outlook.de"><span class="span-blue">christian.grund@outlook.de</span></a>.
        <br /><br />
        Date: February 1, 2024
      </p>
    </section>
      `;
}

/**
 * Generates HTML content for the main section of the legal notice page.
 * @returns {string} The HTML content for the main section of the legal notice page.
 */
function helpH1Html() {
  return /*html*/ `
      <h1 class="h1-text-sites">Help</h1>
      <a href="./summary.html">
        <div class="arrowContainer" id="arrowContainer">
          <img
            src="./assets/img/icons/blueArrowLeft.svg"
            class="arrowLeftIconPrivacyPolicy"
            onClick="history.go(-1); return false;"
            id="arrowLeft"
          />
        </div>
      </a>
  `;
}

function helpHtmlMain() {
  return /*html*/ `
      <p class="p-text-sites">Welcome to the help page for <span class="span-blue">Join</span>, your guide
        to using our kanban project management tool. Here, we'll provide an
        overview of what <span class="span-blue">Join</span>
        is, how it can benefit you, and how to use it.
      </p>
      <h2 class="h2-text-sites">What is Join?</h2>
      <p class="p-text-sites">
        <span class="span-blue">Join</span> is a kanban-based project management tool
        designed and built by a group of dedicated students as part of their web
        development bootcamp at the Developer Akademie. <br /><br />
        Kanban, a Japanese term meaning "billboard", is a highly effective
        method to visualize work, limit work-in-progress, and maximize
        efficiency (or flow). <span class="span-blue">Join</span> leverages the
        principles of kanban to help users manage their tasks and projects in an
        intuitive, visual interface. <br /><br />
        It is important to note that <span class="span-blue">Join</span> is designed
        as an educational exercise and is not intended for extensive business
        usage. While we strive to ensure the best possible user experience, we
        cannot guarantee consistent availability, reliability, accuracy, or
        other aspects of quality regarding <span class="span-blue">Join</span>.

      <h2 class="h2-text-sites">How to use it</h2>
      <p class="p-text-sites">Here is a step-by-step guide on how to use <span class="span-blue">Join</span>:</p>

      <h2 class="h2-text-sites">1.Exploring the Board</h2>
      <p class="p-text-sites"
        >When you log in to <span class="span-blue">Join</span>, you'll find a default board. This board represents your project and contains four
        default lists: "To Do", "In Progress", “Await feedback” and "Done".</p
      >

      <h2 class="h2-text-sites">2.Creating Contacts</h2>
      <p class="p-text-sites"
        >In <span class="span-blue">Join</span>, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New
        contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can
        interact with the tasks on the board.</p
      >

      <h2 class="h2-text-sites">3. Adding Cards</h2>
      <p class="p-text-sites"
        >Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the
        "+" button under the appropriate list to create a new card. Fill in the task details in the card, like task
        name, description, due date, assignees, etc.</p
      >

      <h2 class="h2-text-sites">4.Moving Cards</h2>
      <p class="p-text-sites"
        >As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the
        card from one list to another.</p
      >

      <h2 class="h2-text-sites">5. Deleting Cards</h2>
      <p class="p-text-sites"
        >Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will
        permanently remove it from the board. Please exercise caution when deleting cards, as this action is
        irreversible. Remember that using <span class="span-blue">Join</span> effectively requires consistent updates from you and your team to ensure
        the board reflects the current state of your project. Have more questions about <span class="span-blue">Join</span>? Feel free to contact me at
        [Your Contact Email]. We're here to help you! Enjoy using <span class="span-blue">Join</span>!</p
      >
  `;
}

function privacyPolicyH1Html() {
  return /*html*/ `
      <h1 class="h1-text-sites">Privacy Policy</h1>
      <div class="arrowContainer" id="arrowContainer">
          <img
            src="./assets/img/icons/blueArrowLeft.svg"
            class="arrowLeftIconPrivacyPolicy"
            onClick="history.go(-1); return false;"
            id="arrowLeft"
          />
      </div>
  `;
}

/**
 * Generates HTML content for the main section of the help page.
 * @returns {string} The HTML content for the main section of the help page.
 */
function privacyPolicyHtmlMain() {
  return /*html*/ `
    <p class="p-text-sites">Last updated: January 26, 2024</p>
    <p class="p-text-sites">
      This Privacy Policy describes Our policies and procedures on the
      collection, use and disclosure of Your information when You use the
      Service and tells You about Your privacy rights and how the law protects
      You.
    </p>
    <p class="p-text-sites">
      We use Your Personal data to provide and improve the Service. By using
      the Service, You agree to the collection and use of information in
      accordance with this Privacy Policy. This Privacy Policy has been
      created with the help of the
      <a
        class="linkColor"
        href="https://www.freeprivacypolicy.com/free-privacy-policy-generator/"
        target="_blank"
        >Free Privacy Policy Generator</a
      >.
    </p>
    <h2 class="h2-text-sites">Interpretation and Definitions</h2>
    <h3>Interpretation</h3>
    <p class="p-text-sites">
      The words of which the initial letter is capitalized have meanings
      defined under the following conditions. The following definitions shall
      have the same meaning regardless of whether they appear in singular or
      in plural.
    </p>
    <h3>Definitions</h3>
    <p class="p-text-sites">For the purposes of this Privacy Policy:</p>
    <ul>
      <li>
        <p class="p-text-sites">
          <strong>Account</strong> means a unique account created for You to
          access our Service or parts of our Service.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>Affiliate</strong> means an entity that controls, is
          controlled by or is under common control with a party, where
          &quot;control&quot; means ownership of 50% or more of the shares,
          equity interest or other securities entitled to vote for election of
          directors or other managing authority.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>Company</strong> (referred to as either &quot;the
          Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in
          this Agreement) refers to Join.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>Cookies</strong> are small files that are placed on Your
          computer, mobile device or any other device by a website, containing
          the details of Your browsing history on that website among its many
          uses.
        </p>
      </li>
      <li>
        <p class="p-text-sites"><strong>Country</strong> refers to: Bayern, Germany</p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>Device</strong> means any device that can access the Service
          such as a computer, a cellphone or a digital tablet.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>Personal Data</strong> is any information that relates to an
          identified or identifiable individual.
        </p>
      </li>
      <li>
        <p class="p-text-sites"><strong>Service</strong> refers to the Website.</p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>Service Provider</strong> means any natural or legal person
          who processes the data on behalf of the Company. It refers to
          third-party companies or individuals employed by the Company to
          facilitate the Service, to provide the Service on behalf of the
          Company, to perform services related to the Service or to assist the
          Company in analyzing how the Service is used.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>Usage Data</strong> refers to data collected automatically,
          either generated by the use of the Service or from the Service
          infrastructure itself (for example, the duration of a page visit).
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>Website</strong> refers to Join, accessible from
          <a
            class="linkColor"
            href="https://join-9.developerakademie.net/"
            rel="external nofollow noopener"
            target="_blank"
            >https://join-9.developerakademie.net/</a
          >
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>You</strong> means the individual accessing or using the
          Service, or the company, or other legal entity on behalf of which
          such individual is accessing or using the Service, as applicable.
        </p>
      </li>
    </ul>
    <h2 class="h2-text-sites">Collecting and Using Your Personal Data</h2>
    <h3>Types of Data Collected</h3>
    <h4>Personal Data</h4>
    <p class="p-text-sites">
      While using Our Service, We may ask You to provide me with certain
      personally identifiable information that can be used to contact or
      identify You. Personally identifiable information may include, but is
      not limited to:
    </p>
    <ul>
      <li>
        <p class="p-text-sites">Email address</p>
      </li>
      <li>
        <p class="p-text-sites">First name and last name</p>
      </li>
      <li>
        <p class="p-text-sites">Phone number</p>
      </li>
      <li>
        <p class="p-text-sites">Usage Data</p>
      </li>
    </ul>
    <h4>Usage Data</h4>
    <p class="p-text-sites">Usage Data is collected automatically when using the Service.</p>
    <p class="p-text-sites">
      Usage Data may include information such as Your Device's Internet
      Protocol address (e.g. IP address), browser type, browser version, the
      pages of our Service that You visit, the time and date of Your visit,
      the time spent on those pages, unique device identifiers and other
      diagnostic data.
    </p>
    <p class="p-text-sites">
      When You access the Service by or through a mobile device, We may
      collect certain information automatically, including, but not limited
      to, the type of mobile device You use, Your mobile device unique ID, the
      IP address of Your mobile device, Your mobile operating system, the type
      of mobile Internet browser You use, unique device identifiers and other
      diagnostic data.
    </p>
    <p class="p-text-sites">
      We may also collect information that Your browser sends whenever You
      visit our Service or when You access the Service by or through a mobile
      device.
    </p>
    <h4>Tracking Technologies and Cookies</h4>
    <p class="p-text-sites">
      We use Cookies and similar tracking technologies to track the activity
      on Our Service and store certain information. Tracking technologies used
      are beacons, tags, and scripts to collect and track information and to
      improve and analyze Our Service. The technologies We use may include:
    </p>
    <ul>
      <li>
        <strong>Cookies or Browser Cookies.</strong> A cookie is a small file
        placed on Your Device. You can instruct Your browser to refuse all
        Cookies or to indicate when a Cookie is being sent. However, if You do
        not accept Cookies, You may not be able to use some parts of our
        Service. Unless you have adjusted Your browser setting so that it will
        refuse Cookies, our Service may use Cookies.
      </li>
      <li>
        <strong>Web Beacons.</strong> Certain sections of our Service and our
        emails may contain small electronic files known as web beacons (also
        referred to as clear gifs, pixel tags, and single-pixel gifs) that
        permit the Company, for example, to count users who have visited those
        pages or opened an email and for other related website statistics (for
        example, recording the popularity of a certain section and verifying
        system and server integrity).
      </li>
    </ul>
    <p class="p-text-sites">
      Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies.
      Persistent Cookies remain on Your personal computer or mobile device
      when You go offline, while Session Cookies are deleted as soon as You
      close Your web browser. Learn more about cookies on the
      <a
        class="linkColor"
        href="https://www.freeprivacypolicy.com/blog/sample-privacy-policy-template/#Use_Of_Cookies_And_Tracking"
        target="_blank"
        >Free Privacy Policy website</a
      >
      article.
    </p>
    <p class="p-text-sites">
      We use both Session and Persistent Cookies for the purposes set out
      below:
    </p>
    <ul>
      <li>
        <p class="p-text-sites"><strong>Necessary / Essential Cookies</strong></p>
        <p class="p-text-sites">Type: Session Cookies</p>
        <p class="p-text-sites">Administered by: me</p>
        <p class="p-text-sites">
          Purpose: These Cookies are essential to provide You with services
          available through the Website and to enable You to use some of its
          features. They help to authenticate users and prevent fraudulent use
          of user accounts. Without these Cookies, the services that You have
          asked for cannot be provided, and We only use these Cookies to
          provide You with those services.
        </p>
      </li>
      <li>
        <p class="p-text-sites"><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
        <p class="p-text-sites">Type: Persistent Cookies</p>
        <p class="p-text-sites">Administered by: Me</p>
        <p class="p-text-sites">
          Purpose: These Cookies identify if users have accepted the use of
          cookies on the Website.
        </p>
      </li>
      <li>
        <p class="p-text-sites"><strong>Functionality Cookies</strong></p>
        <p class="p-text-sites">Type: Persistent Cookies</p>
        <p class="p-text-sites">Administered by: Me</p>
        <p class="p-text-sites">
          Purpose: These Cookies allow me to remember choices You make when
          You use the Website, such as remembering your login details or
          language preference. The purpose of these Cookies is to provide You
          with a more personal experience and to avoid You having to re-enter
          your preferences every time You use the Website.
        </p>
      </li>
    </ul>
    <p class="p-text-sites">
      For more information about the cookies we use and your choices regarding
      cookies, please visit our Cookies Policy or the Cookies section of our
      Privacy Policy.
    </p>
    <h3>Use of Your Personal Data</h3>
    <p class="p-text-sites">The Company may use Personal Data for the following purposes:</p>
    <ul>
      <li>
        <p class="p-text-sites">
          <strong>To provide and maintain our Service</strong>, including to
          monitor the usage of our Service.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>To manage Your Account:</strong> to manage Your registration
          as a user of the Service. The Personal Data You provide can give You
          access to different functionalities of the Service that are
          available to You as a registered user.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>For the performance of a contract:</strong> the development,
          compliance and undertaking of the purchase contract for the
          products, items or services You have purchased or of any other
          contract with Me through the Service.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>To contact You:</strong> To contact You by email, telephone
          calls, SMS, or other equivalent forms of electronic communication,
          such as a mobile application's push notifications regarding updates
          or informative communications related to the functionalities,
          products or contracted services, including the security updates,
          when necessary or reasonable for their implementation.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>To provide You</strong> with news, special offers and
          general information about other goods, services and events which we
          offer that are similar to those that you have already purchased or
          enquired about unless You have opted not to receive such
          information.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>To manage Your requests:</strong> To attend and manage Your
          requests to Me.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>For business transfers:</strong> We may use Your information
          to evaluate or conduct a merger, divestiture, restructuring,
          reorganization, dissolution, or other sale or transfer of some or
          all of Our assets, whether as a going concern or as part of
          bankruptcy, liquidation, or similar proceeding, in which Personal
          Data held by Me about our Service users is among the assets
          transferred.
        </p>
      </li>
      <li>
        <p class="p-text-sites">
          <strong>For other purposes</strong>: We may use Your information for
          other purposes, such as data analysis, identifying usage trends,
          determining the effectiveness of our promotional campaigns and to
          evaluate and improve our Service, products, services, marketing and
          your experience.
        </p>
      </li>
    </ul>
    <p class="p-text-sites">We may share Your personal information in the following situations:</p>
    <ul>
      <li>
        <strong>With Service Providers:</strong> We may share Your personal
        information with Service Providers to monitor and analyze the use of
        our Service, to contact You.
      </li>
      <li>
        <strong>For business transfers:</strong> We may share or transfer Your
        personal information in connection with, or during negotiations of,
        any merger, sale of Company assets, financing, or acquisition of all
        or a portion of Our business to another company.
      </li>
      <li>
        <strong>With Affiliates:</strong> We may share Your information with
        Our affiliates, in which case we will require those affiliates to
        honor this Privacy Policy. Affiliates include Our parent company and
        any other subsidiaries, joint venture partners or other companies that
        We control or that are under common control with Me.
      </li>
      <li>
        <strong>With business partners:</strong> We may share Your information
        with Our business partners to offer You certain products, services or
        promotions.
      </li>
      <li>
        <strong>With other users:</strong> when You share personal information
        or otherwise interact in the public areas with other users, such
        information may be viewed by all users and may be publicly distributed
        outside.
      </li>
      <li>
        <strong>With Your consent</strong>: We may disclose Your personal
        information for any other purpose with Your consent.
      </li>
    </ul>
    <h3>Retention of Your Personal Data</h3>
    <p class="p-text-sites">
      The Company will retain Your Personal Data only for as long as is
      necessary for the purposes set out in this Privacy Policy. We will
      retain and use Your Personal Data to the extent necessary to comply with
      our legal obligations (for example, if we are required to retain your
      data to comply with applicable laws), resolve disputes, and enforce our
      legal agreements and policies.
    </p>
    <p class="p-text-sites">
      The Company will also retain Usage Data for internal analysis purposes.
      Usage Data is generally retained for a shorter period of time, except
      when this data is used to strengthen the security or to improve the
      functionality of Our Service, or We are legally obligated to retain this
      data for longer time periods.
    </p>
    <h3>Transfer of Your Personal Data</h3>
    <p class="p-text-sites">
      Your information, including Personal Data, is processed at the Company's
      operating offices and in any other places where the parties involved in
      the processing are located. It means that this information may be
      transferred to — and maintained on — computers located outside of Your
      state, province, country or other governmental jurisdiction where the
      data protection laws may differ than those from Your jurisdiction.
    </p>
    <p class="p-text-sites">
      Your consent to this Privacy Policy followed by Your submission of such
      information represents Your agreement to that transfer.
    </p>
    <p class="p-text-sites">
      The Company will take all steps reasonably necessary to ensure that Your
      data is treated securely and in accordance with this Privacy Policy and
      no transfer of Your Personal Data will take place to an organization or
      a country unless there are adequate controls in place including the
      security of Your data and other personal information.
    </p>
    <h3>Delete Your Personal Data</h3>
    <p class="p-text-sites">
      You have the right to delete or request that We assist in deleting the
      Personal Data that We have collected about You.
    </p>
    <p class="p-text-sites">
      Our Service may give You the ability to delete certain information about
      You from within the Service.
    </p>
    <p class="p-text-sites">
      You may update, amend, or delete Your information at any time by signing
      in to Your Account, if you have one, and visiting the account settings
      section that allows you to manage Your personal information. You may
      also contact Me to request access to, correct, or delete any personal
      information that You have provided to Me.
    </p>
    <p class="p-text-sites">
      Please note, however, that We may need to retain certain information
      when we have a legal obligation or lawful basis to do so.
    </p>
    <h3>Disclosure of Your Personal Data</h3>
    <h4>Business Transactions</h4>
    <p class="p-text-sites">
      If the Company is involved in a merger, acquisition or asset sale, Your
      Personal Data may be transferred. We will provide notice before Your
      Personal Data is transferred and becomes subject to a different Privacy
      Policy.
    </p>
    <h4>Law enforcement</h4>
    <p class="p-text-sites">
      Under certain circumstances, the Company may be required to disclose
      Your Personal Data if required to do so by law or in response to valid
      requests by public authorities (e.g. a court or a government agency).
    </p>
    <h4>Other legal requirements</h4>
    <p class="p-text-sites">
      The Company may disclose Your Personal Data in the good faith belief
      that such action is necessary to:
    </p>
    <ul>
      <li>Comply with a legal obligation</li>
      <li>Protect and defend the rights or property of the Company</li>
      <li>
        Prevent or investigate possible wrongdoing in connection with the
        Service
      </li>
      <li>
        Protect the personal safety of Users of the Service or the public
      </li>
      <li>Protect against legal liability</li>
    </ul>
    <h3>Security of Your Personal Data</h3>
    <p class="p-text-sites">
      The security of Your Personal Data is important to Me, but remember that
      no method of transmission over the Internet, or method of electronic
      storage is 100% secure. While We strive to use commercially acceptable
      means to protect Your Personal Data, We cannot guarantee its absolute
      security.
    </p>
    <h2 class="h2-text-sites">Children's Privacy</h2>
    <p class="p-text-sites">
      Our Service does not address anyone under the age of 13. We do not
      knowingly collect personally identifiable information from anyone under
      the age of 13. If You are a parent or guardian and You are aware that
      Your child has provided Me with Personal Data, please contact Me. If We
      become aware that We have collected Personal Data from anyone under the
      age of 13 without verification of parental consent, We take steps to
      remove that information from Our servers.
    </p>
    <p class="p-text-sites">
      If We need to rely on consent as a legal basis for processing Your
      information and Your country requires consent from a parent, We may
      require Your parent's consent before We collect and use that
      information.
    </p>
    <h2 class="h2-text-sites">Links to Other Websites</h2>
    <p class="p-text-sites">
      Our Service may contain links to other websites that are not operated by
      Me. If You click on a third party link, You will be directed to that
      third party's site. We strongly advise You to review the Privacy Policy
      of every site You visit.
    </p>
    <p class="p-text-sites">
      We have no control over and assume no responsibility for the content,
      privacy policies or practices of any third party sites or services.
    </p>
    <h2 class="h2-text-sites">Changes to this Privacy Policy</h2>
    <p class="p-text-sites">
      We may update Our Privacy Policy from time to time. We will notify You
      of any changes by posting the new Privacy Policy on this page.
    </p>
    <p class="p-text-sites">
      We will let You know via email and/or a prominent notice on Our Service,
      prior to the change becoming effective and update the &quot;Last
      updated&quot; date at the top of this Privacy Policy.
    </p>
    <p class="p-text-sites">
      You are advised to review this Privacy Policy periodically for any
      changes. Changes to this Privacy Policy are effective when they are
      posted on this page.
    </p>
    <h2 class="h2-text-sites">Contact me</h2>
    <p class="p-text-sites">
      If you have any questions about this Privacy Policy, You can contact me:
    </p>
    <ul>
      <li>By email: christian.grund@outlook.de</li>
    </ul>
  `;
}
