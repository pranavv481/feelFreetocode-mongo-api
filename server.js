const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/application', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongodb connected');
  })
  .catch((err) => {
    console.log('mongo error', err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phone: [String],
  isAdmin: Boolean,
});

const User = mongoose.model('user', userSchema);

///////////////////////////////////start/////////////////////////////////////

async function createUser() {
  const user = new User({
    name: 'test2',
    age: 21,
    email: 'test2@gmail.com',
    phone: ['1111111111', '2222222222'],
    isAdmin: false,
  });
  const result = await user.save();
  console.log(result);
}
//createUser();

///////////////////////////////////--end--/////////////////////////////////////

///////////////////////////////////--start---/////////////////////////////////////

async function getUsers() {
  const result = await User.find();
  console.log(result);
}

//getUsers();

///////////////////////////////////---end---/////////////////////////////////////

//////////////////////////////////---start---////////////////////////////////////

async function getUsersById() {
  // const result = await User.findById('5f1129746b4109186c3c06a2');
  const result = await User.find({ _id: '5f1129746b4109186c3c06a2' });
  console.log(result);
}

//getUsersById();

//////////////////////////////////---end--///////////////////////////////////

///////////////////////////////////---Start---//////////////////////////////

// sort limit
async function getUsersSort() {
  const result = await User.find().sort({ name: -1 }).limit(1);
  console.log(result);
}

//getUsersSort();

////////////////////////////---end---/////////////////////////////////////

//////////////////////////////---start---///////////////////////////////////////////

// selct field
async function getUsersSelect() {
  const result = await User.find().select({ isAdmin: 0, __v: 0 });
  console.log(result);
}

//getUsersSelect();

//////////////////////////////------end-------////////////////////////////////

//////////////////////////////////---start---///////////////////////////////////

// or / and condition
async function getUsersSelect() {
  const result = await User.find().and([
    { name: 'virender' },
    { isAdmin: false },
  ]);
  console.log(result);
}

//getUsersSelect();

////////////////////////////////---end---///////////////////////////////////////

///////////////////////////////---start---//////////////////////////////////////////

// or / and condition
async function getUsersSelect() {
  const result = await User.find().and([
    { name: 'virender' },
    { isAdmin: false },
  ]);
  console.log(result);
}

//getUsersSelect();

////////////////////////////////---end---///////////////////////////////////////

///////////////////////////////---start---//////////////////////////////////////////

// count documents
async function getUsersCount() {
  const result = await User.find().countDocuments();

  console.log(result);
}

//getUsersCount();

////////////////////////////////---end---///////////////////////////////////////

///////////////////////////////---start---//////////////////////////////////////////

// skip - pagination
async function getUsersSkip() {
  let page = 3;
  let limit = 5;
  const result = await User.find()
    .select('_id')
    .skip((page - 1) * limit)
    .limit(limit);

  console.log(result);
}

//getUsersSkip();

////////////////////////////////---end---///////////////////////////////////////

///////////////////////////////---start---//////////////////////////////////////////

// skip - pagination
async function getUserUpdate(id) {
  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        name: 'sumit',
        isAdmin: false,
      },
      $inc: {
        age: 1,
      },
    },
    { new: true }
  );

  console.log(user);
  //   const user = await User.findById(id);
  //   if (user) {
  //     user.name = 'mehul';
  //     user.isAdmin = 'true';
  //     const result = await user.save();
  //     console.log(result);
  //   }
  //   return;
}

getUserUpdate('5f113460b6b8661e10717817');
