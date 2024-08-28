const Advert = require('../models/advert.model');
const getImageFileType = require('../utils/getImageFileType');
const deleteFile = require('../utils/deleteFile');
const sanitize = require('mongo-sanitize');

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
        const { title, content, date, price, location } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        if ( title && content && date && price && location && user && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            const stringPattern = new RegExp('^[a-z0-9]+$', 'i');

            if(
                !title.match(stringPattern) ||
                !content.match(stringPattern) ||
                !location.match(stringPattern)
            ) {
                deleteFile(req.file.path);
                return res.status(400).send({ message: 'Wrong input' });
            } else {
                const titleClean = sanitize(title);
                const contentClean = sanitize(content);
                const dateClean = sanitize(date);
                const priceClean = sanitize(price);
                const locationClean = sanitize(location);

                const newAdvert = new Advert({
                    title: titleClean,
                    content: contentClean,
                    date: dateClean,
                    image: req.file.filename,
                    price: priceClean,
                    location: locationClean
                });
                await newAdvert.save();
                res.send({ message: 'OK', newAdvert});
            }
        }
    } catch (err) {
        deleteFile(req.file.path);
        res.status(500).send({ message: err })
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
    try {
        let { title, content, date, price, location } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        const ad = await Advert.findById(req.params.id);

        if(!ad) {
            return res.status(404).send({ message: 'Not found...'});
        }

        if (title && content && date && price && location) {
            const stringPattern = new RegExp('^[a-z0-9]+$', 'i');

            if(
                !title.match(stringPattern) ||
                !content.match(stringPattern) ||
                !location.match(stringPattern) ||
                !(title.length >= 10 && title.length <= 50) ||
                !(content.length >= 20 && content.length <= 1000)
            ) {
                if(req.file) {
                    deleteFile(req.file.path);
                }
                return res.status(400).send({ message: 'Wrong input' });
            }
        const titleClean = sanitize(title);
        const contentClean = sanitize(content);
        const dateClean = sanitize(date);
        const priceClean = sanitize(price);
        const locationClean = sanitize(location);

        ad.title = titleClean;
        ad.content = contentClean;
        ad.date = dateClean;
        ad.price = priceClean;
        ad.location = locationClean;

        if (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            if(ad.image) {
                deleteFile(`public/uploads/${ad.image}`);
            }
            ad.image = req.file.filename;
        }
        await ad.save();
        return res.status(200).send({ message: 'OK', ad });
            
        } else {
            deleteFile(req.file.path);
            return res.status(400).send({ message: 'Missing fields' });
        }
    } catch (err) {
        deleteFile(req.file.path);
        return res.sattus(500).send({ message: err });
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