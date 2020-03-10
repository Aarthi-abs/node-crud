const mongoose = require('mongoose');
    Schema = mongoose.Schema;

//create the schema
const eventSchema = new Schema({
    name: String,
    slug: {
        type: String,
        unique: true
    },
    description: String

});
//middleware-----------
//make sure that the slug is created from the name
eventSchema.pre('save', function(next) { //pre---to call middleware save----before saving-- u should use oly function dont use arrow function may change the this.slug reference
    this.slug = slugify(this.name);      //this--represent this model
    next();
});

//create the model
const eventModel = mongoose.model('Event', eventSchema);

//export the model
module.exports = eventModel;

//function to slugify the name
function slugify(text) {
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           //Replace space with -
    .replace(/[^\w\-]+/g, '')       //Remove all non-word chars
    .replace(/\-\-+/g, '-')         //Remove multiple - with single -
    .replace(/^-+/, '')             //Trim - from start of text
    .replace(/-+$/, '');            //Trim - from end of text
}