const axios = require("axios");
const nodemailer = require("nodemailer");

const shippingRates = [
  {
    weight: 0.5,
    USA: 2300,
    CANADA: 2400,
    EUROPE: 3000,
    AUSTRALIA_NEW_ZEALAND: 3000,
    UK: 1800,
    GULF_COUNTRIES: 1200,
  },
  {
    weight: 1,
    USA: 2800,
    CANADA: 3000,
    EUROPE: 3200,
    AUSTRALIA_NEW_ZEALAND: 3500,
    UK: 2100,
    GULF_COUNTRIES: 1500,
  },
  {
    weight: 1.5,
    USA: 3000,
    CANADA: 3100,
    EUROPE: 3400,
    AUSTRALIA_NEW_ZEALAND: 4000,
    UK: 2300,
    GULF_COUNTRIES: 1700,
  },
  {
    weight: 2,
    USA: 3200,
    CANADA: 3200,
    EUROPE: 3600,
    AUSTRALIA_NEW_ZEALAND: 4300,
    UK: 2400,
    GULF_COUNTRIES: 1800,
  },
  {
    weight: 2.5,
    USA: 3800,
    CANADA: 3800,
    EUROPE: 3900,
    AUSTRALIA_NEW_ZEALAND: 4900,
    UK: 2500,
    GULF_COUNTRIES: 2000,
  },
  {
    weight: 3,
    USA: 4300,
    CANADA: 4400,
    EUROPE: 4200,
    AUSTRALIA_NEW_ZEALAND: 5400,
    UK: 2600,
    GULF_COUNTRIES: 2200,
  },
  {
    weight: 3.5,
    USA: 4500,
    CANADA: 4600,
    EUROPE: 4500,
    AUSTRALIA_NEW_ZEALAND: 5800,
    UK: 2800,
    GULF_COUNTRIES: 2300,
  },
  {
    weight: 4,
    USA: 4600,
    CANADA: 4800,
    EUROPE: 4800,
    AUSTRALIA_NEW_ZEALAND: 6000,
    UK: 3000,
    GULF_COUNTRIES: 2400,
  },
  {
    weight: 4.5,
    USA: 5000,
    CANADA: 5100,
    EUROPE: 5200,
    AUSTRALIA_NEW_ZEALAND: 6500,
    UK: 4000,
    GULF_COUNTRIES: 2500,
  },
  {
    weight: 5,
    USA: 5400,
    CANADA: 5500,
    EUROPE: 5600,
    AUSTRALIA_NEW_ZEALAND: 6800,
    UK: 4500,
    GULF_COUNTRIES: 2600,
  },
  {
    weight: 5.5,
    USA: 4800,
    CANADA: 4800,
    EUROPE: 5100,
    AUSTRALIA_NEW_ZEALAND: 5700,
    UK: 4500,
    GULF_COUNTRIES: 2700,
  },
  {
    weight: 6,
    USA: 4800,
    CANADA: 4800,
    EUROPE: 5100,
    AUSTRALIA_NEW_ZEALAND: 5700,
    UK: 4500,
    GULF_COUNTRIES: 2700,
  },
  {
    weight: 6.5,
    USA: 5600,
    CANADA: 5600,
    EUROPE: 5950,
    AUSTRALIA_NEW_ZEALAND: 6650,
    UK: 5250,
    GULF_COUNTRIES: 3150,
  },
  {
    weight: 7,
    USA: 5600,
    CANADA: 5600,
    EUROPE: 5950,
    AUSTRALIA_NEW_ZEALAND: 6650,
    UK: 5250,
    GULF_COUNTRIES: 3150,
  },
  {
    weight: 7.5,
    USA: 6400,
    CANADA: 6400,
    EUROPE: 6800,
    AUSTRALIA_NEW_ZEALAND: 7600,
    UK: 6000,
    GULF_COUNTRIES: 3600,
  },
  {
    weight: 8,
    USA: 6400,
    CANADA: 6400,
    EUROPE: 6800,
    AUSTRALIA_NEW_ZEALAND: 7600,
    UK: 6000,
    GULF_COUNTRIES: 3600,
  },
  {
    weight: 8.5,
    USA: 7200,
    CANADA: 7200,
    EUROPE: 7650,
    AUSTRALIA_NEW_ZEALAND: 8550,
    UK: 6750,
    GULF_COUNTRIES: 4050,
  },
  {
    weight: 9,
    USA: 7200,
    CANADA: 7200,
    EUROPE: 7650,
    AUSTRALIA_NEW_ZEALAND: 8550,
    UK: 6750,
    GULF_COUNTRIES: 4050,
  },
  {
    weight: 9.5,
    USA: 8000,
    CANADA: 8000,
    EUROPE: 8500,
    AUSTRALIA_NEW_ZEALAND: 9500,
    UK: 7500,
    GULF_COUNTRIES: 4500,
  },
  {
    weight: 10,
    USA: 8000,
    CANADA: 8000,
    EUROPE: 8500,
    AUSTRALIA_NEW_ZEALAND: 9500,
    UK: 7500,
    GULF_COUNTRIES: 4500,
  },
  {
    weight: 10.5,
    USA: 8250,
    CANADA: 8250,
    EUROPE: 9130,
    AUSTRALIA_NEW_ZEALAND: 9900,
    UK: 7920,
    GULF_COUNTRIES: 4620,
  },
  {
    weight: 11,
    USA: 8250,
    CANADA: 8250,
    EUROPE: 9130,
    AUSTRALIA_NEW_ZEALAND: 9900,
    UK: 7920,
    GULF_COUNTRIES: 4620,
  },
  {
    weight: 11.5,
    USA: 9000,
    CANADA: 9000,
    EUROPE: 9960,
    AUSTRALIA_NEW_ZEALAND: 10800,
    UK: 8640,
    GULF_COUNTRIES: 5040,
  },
  {
    weight: 12,
    USA: 9000,
    CANADA: 9000,
    EUROPE: 9960,
    AUSTRALIA_NEW_ZEALAND: 10800,
    UK: 8640,
    GULF_COUNTRIES: 5040,
  },
  {
    weight: 12.5,
    USA: 9750,
    CANADA: 9750,
    EUROPE: 10790,
    AUSTRALIA_NEW_ZEALAND: 11700,
    UK: 9360,
    GULF_COUNTRIES: 5460,
  },
  {
    weight: 13,
    USA: 9750,
    CANADA: 9750,
    EUROPE: 10790,
    AUSTRALIA_NEW_ZEALAND: 11700,
    UK: 9360,
    GULF_COUNTRIES: 5460,
  },
  {
    weight: 13.5,
    USA: 10500,
    CANADA: 10500,
    EUROPE: 11620,
    AUSTRALIA_NEW_ZEALAND: 12600,
    UK: 10080,
    GULF_COUNTRIES: 5880,
  },
  {
    weight: 14,
    USA: 10500,
    CANADA: 10500,
    EUROPE: 11620,
    AUSTRALIA_NEW_ZEALAND: 12600,
    UK: 10080,
    GULF_COUNTRIES: 5880,
  },
  {
    weight: 14.5,
    USA: 11250,
    CANADA: 11250,
    EUROPE: 12450,
    AUSTRALIA_NEW_ZEALAND: 13500,
    UK: 10800,
    GULF_COUNTRIES: 6300,
  },
  {
    weight: 15,
    USA: 11250,
    CANADA: 11250,
    EUROPE: 12450,
    AUSTRALIA_NEW_ZEALAND: 13500,
    UK: 10800,
    GULF_COUNTRIES: 6300,
  },
  {
    weight: 15.5,
    USA: 11840,
    CANADA: 12000,
    EUROPE: 12800,
    AUSTRALIA_NEW_ZEALAND: 14080,
    UK: 11200,
    GULF_COUNTRIES: 6400,
  },
  {
    weight: 16,
    USA: 11840,
    CANADA: 12000,
    EUROPE: 12800,
    AUSTRALIA_NEW_ZEALAND: 14080,
    UK: 11200,
    GULF_COUNTRIES: 6400,
  },
  {
    weight: 16.5,
    USA: 12580,
    CANADA: 12750,
    EUROPE: 13600,
    AUSTRALIA_NEW_ZEALAND: 14960,
    UK: 11900,
    GULF_COUNTRIES: 6800,
  },
  {
    weight: 17,
    USA: 12580,
    CANADA: 12750,
    EUROPE: 13600,
    AUSTRALIA_NEW_ZEALAND: 14960,
    UK: 11900,
    GULF_COUNTRIES: 6800,
  },
  {
    weight: 17.5,
    USA: 13320,
    CANADA: 13500,
    EUROPE: 14400,
    AUSTRALIA_NEW_ZEALAND: 15840,
    UK: 12600,
    GULF_COUNTRIES: 7200,
  },
  {
    weight: 18,
    USA: 13320,
    CANADA: 13500,
    EUROPE: 14400,
    AUSTRALIA_NEW_ZEALAND: 15840,
    UK: 12600,
    GULF_COUNTRIES: 7200,
  },
  {
    weight: 18.5,
    USA: 14060,
    CANADA: 14250,
    EUROPE: 15200,
    AUSTRALIA_NEW_ZEALAND: 16720,
    UK: 13300,
    GULF_COUNTRIES: 7600,
  },
  {
    weight: 19,
    USA: 14060,
    CANADA: 14250,
    EUROPE: 15200,
    AUSTRALIA_NEW_ZEALAND: 16720,
    UK: 13300,
    GULF_COUNTRIES: 7600,
  },
  {
    weight: 19.5,
    USA: 14800,
    CANADA: 15000,
    EUROPE: 16000,
    AUSTRALIA_NEW_ZEALAND: 17600,
    UK: 14000,
    GULF_COUNTRIES: 8000,
  },
  {
    weight: 20,
    USA: 14800,
    CANADA: 15000,
    EUROPE: 16000,
    AUSTRALIA_NEW_ZEALAND: 17600,
    UK: 14000,
    GULF_COUNTRIES: 8000,
  },
  {
    weight: 21,
    USA: 15330,
    CANADA: 15540,
    EUROPE: 16275,
    AUSTRALIA_NEW_ZEALAND: 17850,
    UK: 14280,
    GULF_COUNTRIES: 8400,
  },
  {
    weight: 22,
    USA: 16060,
    CANADA: 16280,
    EUROPE: 17050,
    AUSTRALIA_NEW_ZEALAND: 18700,
    UK: 14960,
    GULF_COUNTRIES: 8800,
  },
  {
    weight: 23,
    USA: 16790,
    CANADA: 17020,
    EUROPE: 17825,
    AUSTRALIA_NEW_ZEALAND: 19550,
    UK: 15640,
    GULF_COUNTRIES: 9200,
  },
  {
    weight: 24,
    USA: 17520,
    CANADA: 17760,
    EUROPE: 18600,
    AUSTRALIA_NEW_ZEALAND: 20400,
    UK: 16320,
    GULF_COUNTRIES: 9600,
  },
  {
    weight: 25,
    USA: 18250,
    CANADA: 18500,
    EUROPE: 19375,
    AUSTRALIA_NEW_ZEALAND: 21250,
    UK: 17000,
    GULF_COUNTRIES: 10000,
  },
  {
    weight: 26,
    USA: 18980,
    CANADA: 19240,
    EUROPE: 20150,
    AUSTRALIA_NEW_ZEALAND: 22100,
    UK: 17680,
    GULF_COUNTRIES: 10400,
  },
  {
    weight: 27,
    USA: 19710,
    CANADA: 19980,
    EUROPE: 20925,
    AUSTRALIA_NEW_ZEALAND: 22950,
    UK: 18360,
    GULF_COUNTRIES: 10800,
  },
  {
    weight: 28,
    USA: 20440,
    CANADA: 20720,
    EUROPE: 21700,
    AUSTRALIA_NEW_ZEALAND: 23800,
    UK: 19040,
    GULF_COUNTRIES: 11200,
  },
  {
    weight: 29,
    USA: 21170,
    CANADA: 21460,
    EUROPE: 22475,
    AUSTRALIA_NEW_ZEALAND: 24650,
    UK: 19720,
    GULF_COUNTRIES: 11600,
  },
  {
    weight: 30,
    USA: 21900,
    CANADA: 22200,
    EUROPE: 23250,
    AUSTRALIA_NEW_ZEALAND: 25500,
    UK: 20400,
    GULF_COUNTRIES: 12000,
  },
  {
    weight: "30-50",
    USA: 720,
    CANADA: 720,
    EUROPE: 700,
    AUSTRALIA_NEW_ZEALAND: 840,
    UK: 660,
    GULF_COUNTRIES: 400,
  },
];

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net", // GoDaddy's SMTP host
  port: 465, // SSL port
  secure: true, // Use true for 465, false for 587
  auth: {
    user: "enquiry@rabbitspeed.in", // Your GoDaddy email address
    pass: "Rabbitspeed123!", // Your GoDaddy email password
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
  connectionTimeout: 10000, // 10 seconds
});
const sendEmailWithRetry = async (transporter, mailOptions, retries = 3) => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      await transporter.sendMail(mailOptions);
      return;
    } catch (error) {
      if (attempt === retries - 1) throw error; // Only rethrow on the last attempt
      console.warn(`Retrying email send: attempt ${attempt + 1}`);
      console.error(error);
    }
  }
};

function findClosestWeight(weight) {
  return shippingRates.reduce((prev, curr) =>
    Math.abs(curr.weight - weight) < Math.abs(prev.weight - weight)
      ? curr
      : prev
  );
}

const convertCurrency = async (req, res) => {
  try {
    const { baseCurrency, convertCurrency, amount } = req.body;

    // Validate input
    if (!baseCurrency || !convertCurrency || !amount) {
      return res.status(400).json({
        error: "baseCurrency, convertCurrency, and amount are required.",
      });
    }

    // Check if amount is a valid number
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        error: "Invalid amount. Please provide a valid number greater than 0.",
      });
    }

    // Make the API call to fetch conversion rates
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_VtwKKyZoP9UEk55HfPfmE51xSMtJdf0BeVHzIQwb&currencies=${convertCurrency}&base_currency=${baseCurrency}`
    );

    const data = response.data;

    // Check if conversion data exists
    if (!data.data[convertCurrency]) {
      return res
        .status(404)
        .json({ error: `Conversion rate for ${convertCurrency} not found.` });
    }

    // Calculate the converted amount
    const totalAmount = (data.data[convertCurrency] * amount).toFixed(2);
    const baseAmount = data.data[convertCurrency].toFixed(2);

    // Return successful response with status 200
    return res.status(200).json({
      totalAmount,
      baseAmount,
      message: `Conversion from ${baseCurrency} to ${convertCurrency} was successful.`,
    });
  } catch (err) {
    // Handle different error cases
    if (err.response && err.response.status === 401) {
      return res
        .status(401)
        .json({ error: "Invalid API key or unauthorized access." });
    } else if (err.response && err.response.status === 400) {
      return res
        .status(400)
        .json({ error: "Bad request to currency conversion API." });
    } else if (err.code === "ENOTFOUND") {
      return res.status(503).json({
        error: "Currency conversion service is currently unavailable.",
      });
    } else {
      console.error(err); // Log the full error for debugging
      return res
        .status(500)
        .json({ error: "Internal Server Error: Failed to Convert Currency" });
    }
  }
};
const ShippingCalculate = async (req, res) => {
  try {
    const { weight, country } = req.body;

    // Validate input
    if (!weight || !country) {
      return res
        .status(400)
        .json({ error: "Weight and country are required." });
    }

    // Find the rate based on the closest weight
    const rate = findClosestWeight(weight);

    if (!rate) {
      return res
        .status(404)
        .json({ error: "No rates found for the given weight." });
    }

    const countryUpper = country.toUpperCase().replace(" ", "_");
    const costPerKg = rate[countryUpper];

    // Validate rate for the country
    if (costPerKg === undefined) {
      return res
        .status(400)
        .json({ error: `No rates found for country: ${country}` });
    }

    let cost;

    // Calculate cost based on weight range
    if (weight > 30) {
      const baseRate = shippingRates.find((r) => r.weight === "30-50");
      if (!baseRate) {
        return res
          .status(404)
          .json({ error: "No rates available for the 30-50kg range." });
      }

      const perKgRate = baseRate[countryUpper];
      const additionalWeight = weight - 30;
      cost = 21900 + additionalWeight * perKgRate;
    } else if (typeof rate.weight === "string" && rate.weight === "30-50") {
      // Handle special case where weight matches exactly
      const extraWeight = weight - 30;
      cost = 21900 + extraWeight * costPerKg;
    } else {
      cost = costPerKg;
    }

    // Return the calculated cost
    return res.status(200).json({ weight, country, cost });
  } catch (error) {
    console.error("Error calculating shipping cost:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const enquiry = async (req, res) => {
  try {
    const {
      customerName,
      originCountry,
      weight,
      destinationCountry,
      phone,
      email,
    } = req.body;

    // Input validation
    if (
      !customerName ||
      !originCountry ||
      !weight ||
      !destinationCountry ||
      !phone ||
      !email
    ) {
      return res.status(400).send({ message: "All fields are required." });
    }

    // Additional validation can be added here (e.g., email format, phone format, etc.)

    const mailOptions = {
      from: "enquiry@rabbitspeed.in",
      to: "enquiry@rabbitspeed.in",
      subject: "New Shipping Enquiry",
      html: `
        <p>You have a new shipping enquiry with the following details:</p>
        <ul>
          <li><strong>Name:</strong> ${customerName}</li>
          <li><strong>Origin Country:</strong> ${originCountry}</li>
          <li><strong>Weight:</strong> ${weight} KG</li>
          <li><strong>Destination Country:</strong> ${destinationCountry}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
      `,
    };

    // Send the email
    await sendEmailWithRetry(transporter, mailOptions);
    // await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(200).send({
      message: "Thank you for your Enquiry. Our team will contact you soon.",
    });
  } catch (err) {
    console.error("Error sending email:", err);

    // Handle specific error types if needed
    if (err instanceof Error) {
      // Handle the error
      console.log("An error occurred:", err.message);
    }

    // Default to 500 for server errors
    res
      .status(500)
      .send({ message: "Error sending enquiry. Please try again later." });
  }
};
const contactUs = async (req, res) => {
  try {
    const { fullName, contact, email, message } = req.body;
    if (!fullName || !contact || !email || !message) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const mailOptions = {
      from: "enquiry@rabbitspeed.in",
      to: "enquiry@rabbitspeed.in",
      subject: "New Contact Us Enquiry",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #0056b3;">New Enquiry Received</h2>
          <p>Dear Team,</p>
          <p>You have received a new enquiry through the <strong>Contact Us</strong> form on your website:</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Contact Number:</strong> ${contact}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p style="margin-top: 20px;">Please reach out to the customer at your earliest convenience.</p>
          <p>Best Regards,<br/>Rabbitspeed Customer Support Team</p>
          <hr style="margin-top: 30px;"/>
          <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `,
    };

    // Send the email
    // await transporter.sendMail(mailOptions);
    await sendEmailWithRetry(transporter, mailOptions);
    // Respond to the client
    res.status(200).send({
      message: "Thank you for your Enquiry. Our team will contact you soon.",
    });
  } catch (err) {
    console.error("Error sending email:", err);

    // Default to 500 for server errors
    res
      .status(500)
      .send({ message: "Error sending enquiry. Please try again later." });
  }
};

module.exports = {
  convertCurrency,
  ShippingCalculate,
  enquiry,
  contactUs,
};
