const { Schema, model } = require('mongoose')

// PURCHASE CATEGORY SCHEMA
const TransactionSchema = new Schema(
    {
        autoId: {type: Number, default: 1000},
        customerRef: { type: String, required: true },
        amount: { type: String, required: true },
        date: {type: Date, default: new Date()},
        notes: {type: String, default: ''},
        department: {type: String,  default: 'General'}
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

TransactionSchema.pre('save', async function(next){
  try{
    const Transaction = model('Transaction', TransactionSchema)
    const { autoId } = await Transaction.findOne()
      .sort({autoId: -1})
      .select( 'autoId' )

    if(autoId){
      this.autoId = parseInt(autoId) + 1
    }else{
      this.autoId = 1000
    }

    next()

  }catch(err){
    console.log(err)
  }
})


module.exports = model('Transaction', TransactionSchema)
