const GoogleMapSection = () => {
  return (
    <section className="w-full h-[400px] mt-0">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.609208839858!2d78.0041788744679!3d27.199196349080885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397477325d9c8b1d%3A0x6d2f62f64e7b88cf!2sLIC%20Building%2C%20113%20F%2F28%2C%20Sanjay%20Place%2C%20Civil%20Lines%2C%20Agra%2C%20Uttar%20Pradesh%20282002!5e0!3m2!1sen!2sin!4v1723817289021!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default GoogleMapSection;