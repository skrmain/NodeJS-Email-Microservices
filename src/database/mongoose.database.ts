import mongoose from 'mongoose';

const dbURL = 'mongodb://localhost';

mongoose
    .connect(dbURL, { dbName: 'test' })
    .then((res) => {
        // console.dir(res, { depth: 0 });
        console.log('DB connected');

        // let conn = mongoose.connection.db.databaseName;
        // console.dir(conn, { depth: 0 });

        // res.connection.close();
    })
    .catch((err) => {
        console.log('Error in DB Connection : ', err.name);
    });

const Employee = mongoose.model(
    'Employee',
    new mongoose.Schema({
        name: {
            type: String,
        },
    })
);

const conn = mongoose.connection;

// ///// INSERT
// let e1 = new Employee({ name: "Ram" });

// e1.save()
//   .then(res => {
//     console.dir(res);
//     conn.close()
//   })
//   .catch(err => {
//     console.log("Error in insertion : ", err.name);
//   });

// //////////// READ
// Employee.find().then(res=>{
//   console.log(res)
//   conn.close()
// })

// /////////// Update
// Employee.updateOne(
//   { name: "Ram" },
//   {
//     $set: {
//       name: "JavaScript"
//     }
//   }
// ).then(res => {
//   console.log(res);
//   conn.close()
// });

// ////// DELETE
// Employee.deleteOne({ name: "Ram" }, (err, res) => {
//   console.log("Deleted");
//   console.log(res);
//   conn.close()
// });

// We can use conn.close() OR mongoose.disconnect()

// Multiple Types
const menuSchema = new mongoose.Schema({
    category: {
        // type: {},
        // OR
        type: mongoose.Schema.Types.Mixed,
    },
});

// NOTE:
// - _id ==> ObjectId(4 bytes timestamp, 3 bytes machine_id, 2 bytes process id, 3 bytes incrementer)
