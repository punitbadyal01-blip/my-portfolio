// ==============================================================
// Contact.jsx — Contact section with Formspree integration
// ==============================================================
import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaCheckCircle, FaWhatsapp, FaExclamationCircle } from 'react-icons/fa';
import './Contact.css';

// Initial form state
const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [submittedName, setSubmittedName] = useState('');
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const sectionRef = useRef(null);

    // Fade-in on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    /**
     * Client-side form validation
     * Returns an errors object. Empty object means no errors.
     */
    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Your name is required.';
        if (!form.email.trim()) errs.email = 'Email address is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errs.email = 'Please enter a valid email.';
        if (!form.subject.trim()) errs.subject = 'Subject is required.';
        if (!form.message.trim()) errs.message = 'Message cannot be empty.';
        else if (form.message.trim().length < 20)
            errs.message = 'Message must be at least 20 characters.';
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear individual field error on change
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setSending(true);
        setSendError('');

        try {
            const res = await fetch(
                'https://formspree.io/f/mykdvlbe',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        subject: form.subject,
                        message: form.message,
                    }),
                }
            );

            if (!res.ok) throw new Error('Formspree responded with ' + res.status);

            const senderName = form.name;
            setForm(INITIAL_FORM);
            setSubmittedName(senderName);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 6000);
        } catch (err) {
            console.error('Formspree error:', err);
            setSendError('Oops! Something went wrong. Please try again or email me directly at punitbadyal01@gmail.com.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="contact section" ref={sectionRef}>
            <div className="container">

                {/* Header */}
                <div className="section-header fade-in">
                    <p className="section-subtitle">Get In Touch</p>
                    <h2 className="section-title">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <div className="section-divider" />
                </div>

                <div className="contact__content">

                    {/* ---- Left Info ---- */}
                    <div className="contact__info fade-in">
                        <h3 className="contact__tagline">
                            Open to exciting opportunities &amp;<br />collaborations 🚀
                        </h3>
                        <p className="contact__intro">
                            Whether you have a project idea, an internship opportunity, or just want
                            to say hi — my inbox is always open. I'll do my best to get back to you
                            promptly!
                        </p>

                        {/* Email */}
                        <a
                            id="contact-email-link"
                            className="contact__detail"
                            href="mailto:punitbadyal01@gmail.com"
                            aria-label="Send email to Punit Badyal"
                        >
                            <div className="contact__detail-icon">✉️</div>
                            <div className="contact__detail-body">
                                <p className="contact__detail-label">Email</p>
                                <p className="contact__detail-value">punitbadyal01@gmail.com</p>
                            </div>
                        </a>

                        {/* WhatsApp */}
                        <a
                            id="contact-whatsapp-link"
                            className="contact__detail"
                            href="https://wa.me/917780886857"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contact via WhatsApp"
                        >
                            <div className="contact__detail-icon"><FaWhatsapp /></div>
                            <div className="contact__detail-body">
                                <p className="contact__detail-label">WhatsApp</p>
                                <p className="contact__detail-value">+91 7780886857</p>
                            </div>
                        </a>

                        {/* GitHub */}
                        <a
                            id="contact-github-link"
                            className="contact__detail"
                            href="https://github.com/punitbadyal01-blip"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit GitHub profile"
                        >
                            <div className="contact__detail-icon"><FaGithub /></div>
                            <div className="contact__detail-body">
                                <p className="contact__detail-label">GitHub</p>
                                <p className="contact__detail-value">punitbadyal01-blip</p>
                            </div>
                        </a>

                        {/* LinkedIn */}
                        <a
                            id="contact-linkedin-link"
                            className="contact__detail"
                            href="https://www.linkedin.com/in/punit-badyal-1b2935324"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit LinkedIn profile"
                        >
                            <div className="contact__detail-icon"><FaLinkedin /></div>
                            <div className="contact__detail-body">
                                <p className="contact__detail-label">LinkedIn</p>
                                <p className="contact__detail-value">punit-badyal-1b2935324</p>
                            </div>
                        </a>
                    </div>

                    {/* ---- Right: Contact Form ---- */}
                    <div className="contact__form-card fade-in">
                        <h3 className="contact__form-title">Send a Message 📬</h3>

                        {/* Success banner */}
                        {submitted && (
                            <div className="form-success" role="alert">
                                <FaCheckCircle />
                                <span>Message sent! I'll reply soon. Thanks, <strong>{submittedName || 'friend'}</strong>! 🎉</span>
                            </div>
                        )}

                        {/* Error banner */}
                        {sendError && (
                            <div className="form-send-error" role="alert">
                                <FaExclamationCircle />
                                <span>{sendError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                            {/* Name & Email row */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="contact-name">Name</label>
                                    <input
                                        id="contact-name"
                                        className={`form-input${errors.name ? ' error' : ''}`}
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        autoComplete="name"
                                        aria-required="true"
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                    />
                                    {errors.name && <span id="name-error" className="form-error" role="alert">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="contact-email">Email</label>
                                    <input
                                        id="contact-email"
                                        className={`form-input${errors.email ? ' error' : ''}`}
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@email.com"
                                        autoComplete="email"
                                        aria-required="true"
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                    />
                                    {errors.email && <span id="email-error" className="form-error" role="alert">{errors.email}</span>}
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="contact-subject">Subject</label>
                                <input
                                    id="contact-subject"
                                    className={`form-input${errors.subject ? ' error' : ''}`}
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="What's this about?"
                                    aria-required="true"
                                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                                />
                                {errors.subject && <span id="subject-error" className="form-error" role="alert">{errors.subject}</span>}
                            </div>

                            {/* Message */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="contact-message">Message</label>
                                <textarea
                                    id="contact-message"
                                    className={`form-textarea${errors.message ? ' error' : ''}`}
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project, opportunity, or just say hello!"
                                    aria-required="true"
                                    aria-describedby={errors.message ? 'message-error' : undefined}
                                />
                                {errors.message && <span id="message-error" className="form-error" role="alert">{errors.message}</span>}
                            </div>

                            {/* Submit button */}
                            <button
                                id="contact-submit-btn"
                                type="submit"
                                className="btn btn-primary form-submit"
                                disabled={sending}
                                aria-label="Send message"
                            >
                                {sending ? (
                                    <>⏳ Sending...</>
                                ) : (
                                    <><FaPaperPlane /> Send Message</>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
