const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkID = (req, res, next, val) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  next();
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  //   console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) return err;
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};
exports.updateTour = (req, res) => {
  tours[tourIndex] = { ...tours[tourIndex], ...req.body };
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        return res.status(500).json({ status: 'error', message: err.message });
      res.status(200).json({
        status: 'success',
        data: {
          tour: tours[tourIndex],
        },
      });
    },
  );
};
exports.deleteTour = (req, res) => {
  tours.splice(tourIndex, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        return res.status(500).json({ status: 'error', message: err.message });
      res.status(204).json({
        status: 'success',
        data: null,
      });
    },
  );
};
