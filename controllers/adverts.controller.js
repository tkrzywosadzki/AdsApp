const Advert = require('../models/advert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Advert.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const ad = await Advert.findById(req.params.id);
        if(!ad) res.status(404).json({ message: 'Not found' });
        else res.json(ad);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.postNew = async (req, res) => {
    try {
        const { title, content, date, image, price, location } = req.body;
        const newAdvert = new Advert({
            title: title,
            content: content,
            date: date,
            image: image,
            price: price,
            location: location
         });
        await newAdvert.save();
        res.json({ message: 'OK' });

    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const ad = await Advert.findById(req.params.id);
        if(ad) {
        await Advert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK', ad });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
    const { title, content, date, image, price, location } = req.body;
    try {
        const ad = await Advert.findById(req.params.id);
        if(ad) {
        ad.title = title;
        ad.content = content;
        ad.date = date;
        ad.image = image;
        ad.price = price;
        ad.location = location;
        await ad.save();
        res.json({ message: 'OK', ad });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getByPhrase = async (req, res) => {
    try {
      const searchPhrase = req.params.searchPhrase;
      const matchingAds = await Advert.find({ title: { $regex: searchPhrase, $options: 'i' } });
      res.json(matchingAds);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };