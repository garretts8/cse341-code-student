const mongodb = require('../db/connect');

const getProfessional = async (req, res) => {
  try {
    // now _db is already the 'test' database
    const result = await mongodb
      .getDb()
      .collection('users')
      .find()
      .toArray();

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No professional found' });
    }

    const doc = result[0];

    const professional = {
      professionalName: doc.professionalName,
      nameLink: {
        firstName: doc.nameLink.firstName,
        url: doc.nameLink.url
      },
      base64Image: doc.base64Image,
      firstName: doc.firstName,
      primaryDescription: doc.primaryDescription,
      workDescription1: doc.workDescription1,
      workDescription2: doc.workDescription2,
      linkTitleText: doc.linkTitleText,
      linkedInLink: {
        link: doc.linkedInLink.link,
        text: doc.linkedInLink.text
      },
      githubLink: {
        link: doc.githubLink.link,
        text: doc.githubLink.text
      },
      contactText: doc.contactText
    };

    res.status(200).json(professional);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfessional };