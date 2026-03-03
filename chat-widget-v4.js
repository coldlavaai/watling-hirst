/* ═══════════════════════════════════════════════════════
   V4 Premium Chat Widget JavaScript
   Watling & Hirst Limited - NO PLACEHOLDERS!
   ═══════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // V4 CONFIGURATION - NO PLACEHOLDERS!
  const config = {
    businessName: 'Watling & Hirst',
    primaryColor: '#930201',
    botName: 'Accounting Assistant',
    botEmoji: '📊',
    theme: 'light',
    greeting: 'Hello! 👋 Welcome to Watling & Hirst. With over 100 years operating in Chichester, we\'re Chartered Certified Accountants and Xero specialists. How can I help you today?',
    quickReplies: [
      'Tax services',
      'Xero software',
      'Self-assessment',
      'Payroll services',
      'Contact us'
    ],
    responses: [
      {
        keywords: ['tax', 'taxes', 'corporate tax', 'income tax', 'vat', 'capital gains', 'cgt', 'inheritance', 'iht'],
        answer: '💷 **Tax Services**\\n\\nCorporate tax and income tax to VAT, capital gains tax and inheritance tax planning:\\n\\n• Corporation tax\\n• VAT returns & planning\\n• Capital gains tax (CGT)\\n• Inheritance tax (IHT) planning\\n• Strategic tax advice\\n\\nOptimize your tax position with 100+ years of expertise.\\n\\n📞 01243 783818\\n📧 info@watlingandhirst.com'
      },
      {
        keywords: ['xero', 'software', 'cloud', 'accounting software', 'digital'],
        answer: '💻 **Xero Accounting Software**\\n\\nWe\'re **Xero Certified Advisors** and **Xero Tax Specialists**:\\n\\n• Xero implementation & training\\n• Cloud accounting migration\\n• Real-time financial visibility\\n• Making Tax Digital ready\\n• Ongoing Xero support\\n\\nHarness the power of cloud accounting.\\n\\n📞 01243 783818\\n📧 info@watlingandhirst.com'
      },
      {
        keywords: ['self-assessment', 'self assessment', 'personal tax', 'private', 'individual'],
        answer: '👤 **Self-Assessment**\\n\\nDedicated services for private individuals:\\n\\n• Self-assessment tax returns\\n• Personal tax planning\\n• HMRC correspondence\\n• Deadline management\\n• Tax-efficient strategies\\n\\nExpert support for your personal taxes.\\n\\n📞 01243 783818\\n📧 info@watlingandhirst.com'
      },
      {
        keywords: ['payroll', 'cis', 'paye', 'construction', 'wages'],
        answer: '👥 **Payroll & CIS**\\n\\nDedicated payroll management services:\\n\\n• Monthly payroll processing\\n• PAYE & RTI submissions\\n• Construction Industry Scheme (CIS)\\n• Auto-enrolment pensions\\n• Payslip generation\\n\\nReliable, accurate payroll every time.\\n\\n📞 01243 783818\\n📧 info@watlingandhirst.com'
      },
      {
        keywords: ['bookkeeping', 'accounting', 'accounts', 'bookkeeper'],
        answer: '📚 **Bookkeeping Services**\\n\\nProfessional bookkeeping to keep your records accurate:\\n\\n• Transaction recording\\n• Bank reconciliations\\n• Ledger management\\n• Regular updates\\n• Compliance support\\n\\nAccurate, up-to-date financial records.\\n\\n📞 01243 783818\\n📧 info@watlingandhirst.com'
      },
      {
        keywords: ['audit', 'auditing', 'assurance'],
        answer: '✓ **Audit Services**\\n\\nIndependent audit providing assurance:\\n\\n• Statutory audits\\n• Financial statement review\\n• Independent verification\\n• Compliance checks\\n\\nTrusted audit expertise for over 100 years.\\n\\n📞 01243 783818\\n📧 info@watlingandhirst.com'
      },
      {
        keywords: ['business plan', 'forecast', 'forecasting', 'planning'],
        answer: '📈 **Business Plans & Forecasts**\\n\\nStrategic planning and forecasting:\\n\\n• Business plan preparation\\n• Financial forecasting\\n• Cash flow projections\\n• Funding applications\\n• Growth strategy\\n\\nPlan for success with expert guidance.\\n\\n📞 01243 783818\\n📧 info@watlingandhirst.com'
      },
      {
        keywords: ['accountancy', 'accounting services', 'accounts'],
        answer: '📊 **Accountancy Services**\\n\\nProfessional accounting for small and medium-sized businesses:\\n\\n• Annual accounts preparation\\n• Management accounts\\n• Financial reporting & analysis\\n• Compliance support\\n\\nExpert guidance you can trust.\\n\\n📞 01243 783818\\n📧 info@watlingandhirst.com'
      },
      {
        keywords: ['contact', 'phone', 'email', 'address', 'where', 'location', 'find', 'reach'],
        answer: 'Get in touch with Watling & Hirst:\\n\\n📍 **Address:**\\nCawley Place, 15 Cawley Road\\nChichester, West Sussex\\nPO19 1UZ\\n\\n📞 **Phone:** 01243 783818\\n📧 **Email:** info@watlingandhirst.com\\n🌐 **Website:** www.watlingandhirst.com\\n\\nWe look forward to hearing from you!'
      },
      {
        keywords: ['about', 'who', 'history', 'established', '100', 'years', 'century'],
        answer: 'Watling & Hirst Limited is a **long established accountancy firm** with **over 100 years** operating in Chichester, West Sussex.\\n\\n✓ **Chartered Certified Accountants**\\n✓ **Xero Certified Advisor & Tax Specialist**\\n✓ **100+ years of expertise**\\n✓ **Diverse client industries**\\n\\n*"Proactive and reliable with a prompt and efficient response focused on supporting your business goals."*\\n\\nA century of trusted excellence.'
      }
    ],
    fallback: 'Thanks for your question! For expert advice from our team with over 100 years of experience:\\n\\n📞 **Phone:** 01243 783818\\n📧 **Email:** info@watlingandhirst.com\\n🌐 **Website:** www.watlingandhirst.com\\n\\nWe\'re here to help! 😊'
  };

  // State
  let messages = [];
  let isOpen = false;

  // Create widget HTML
  function createWidget() {
    const widgetHTML = `
      <div class="chat-widget">
        <!-- Chat Window -->
        <div class="chat-window" id="chat-window">
          <!-- Header with brand gradient -->
          <div class="chat-header">
            <div class="chat-header-info">
              <div class="chat-header-avatar">${config.botEmoji}</div>
              <div class="chat-header-text">
                <h3>${config.businessName}</h3>
                <p>Online now</p>
              </div>
            </div>
            <button class="chat-close" id="chat-close" aria-label="Close chat">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M12 4L4 12M4 4l8 8"/>
              </svg>
            </button>
          </div>

          <!-- Messages -->
          <div class="chat-messages" id="chat-messages"></div>

          <!-- Quick Replies -->
          <div class="quick-replies" id="quick-replies"></div>

          <!-- Input -->
          <div class="chat-input-wrapper">
            <div class="chat-input-container">
              <input
                type="text"
                class="chat-input"
                id="chat-input"
                placeholder="Type your message..."
                aria-label="Chat message input"
              />
              <button class="chat-send" id="chat-send" aria-label="Send message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Chat Bubble Button -->
        <button class="chat-bubble" id="chat-bubble" aria-label="Open chat">
          <span id="chat-bubble-icon">${config.botEmoji}</span>
        </button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  // Add message to chat
  function addMessage(text, sender = 'bot') {
    const messagesContainer = document.getElementById('chat-messages');
    const messageHTML = `
      <div class="message ${sender}">
        <div class="message-bubble">${formatMessage(text)}</div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messages.push({ text, sender, timestamp: new Date() });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Format message (convert **bold** and \n to HTML)
  function formatMessage(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  // Show typing indicator
  function showTyping() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingHTML = `
      <div class="message bot typing-message">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Hide typing indicator
  function hideTyping() {
    const typing = document.querySelector('.typing-message');
    if (typing) typing.remove();
  }

  // Get bot response
  function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Check each response for keyword matches
    for (const response of config.responses) {
      for (const keyword of response.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          return response.answer;
        }
      }
    }

    return config.fallback;
  }

  // Handle user message
  function handleUserMessage(text) {
    if (!text.trim()) return;

    // Add user message
    addMessage(text, 'user');

    // Hide quick replies after first message
    document.getElementById('quick-replies').innerHTML = '';

    // Show typing
    showTyping();

    // Get response after delay
    setTimeout(() => {
      hideTyping();
      const response = getBotResponse(text);
      addMessage(response, 'bot');
    }, 800);

    // Clear input
    document.getElementById('chat-input').value = '';
  }

  // Show quick replies
  function showQuickReplies() {
    const quickRepliesContainer = document.getElementById('quick-replies');
    quickRepliesContainer.innerHTML = config.quickReplies
      .map(reply => `
        <button class="quick-reply-btn" data-reply="${reply}">
          ${reply}
        </button>
      `)
      .join('');

    // Add click handlers
    document.querySelectorAll('.quick-reply-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        handleUserMessage(btn.dataset.reply);
      });
    });
  }

  // Toggle chat window
  function toggleChat() {
    isOpen = !isOpen;
    const chatWindow = document.getElementById('chat-window');
    const chatBubble = document.getElementById('chat-bubble');
    const chatBubbleIcon = document.getElementById('chat-bubble-icon');

    if (isOpen) {
      chatWindow.classList.add('open');
      chatBubbleIcon.textContent = '✕';

      // Add greeting if first time opening
      if (messages.length === 0) {
        addMessage(config.greeting, 'bot');
        showQuickReplies();
      }
    } else {
      chatWindow.classList.remove('open');
      chatBubbleIcon.textContent = config.botEmoji;
    }
  }

  // Initialize
  function init() {
    createWidget();

    // Event listeners
    document.getElementById('chat-bubble').addEventListener('click', toggleChat);
    document.getElementById('chat-close').addEventListener('click', toggleChat);

    document.getElementById('chat-send').addEventListener('click', () => {
      const input = document.getElementById('chat-input');
      handleUserMessage(input.value);
    });

    document.getElementById('chat-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage(e.target.value);
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
