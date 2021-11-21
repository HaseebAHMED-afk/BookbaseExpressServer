const User = require("../Model/User");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../Utils/jwt");
const VerificationCodes = require("../Model/VerificationCodes");
const ForgetPassword = require("../Model/ForgetPasswordCode");
const { sendMail } = require("../Utils/nodemailer");
const ForgetPasswordCode = require("../Model/ForgetPasswordCode");
const Author = require("../Model/Author");
const Reader = require("../Model/Reader");
const Publisher = require("../Model/Publisher");
const saltRounds = 10;
require("dotenv").config();






exports.register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkEmail = await User.findOne({ email: email });

    if (checkEmail) {
      res.json({
        status: 400,
        message: "User already exists.",
      });
    } else {
      try {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (err) {
            res.json({
              status: 500,
              message: err,
            });
          } else {
            const newUser = await User({
              userName,
              email,
              password: hash,
            });

            try {
              const response = await newUser.save();

              res.json({
                status: 200,
                message: response,
              });
            } catch (error) {
              res.json({
                status: 500,
                message: error.message,
              });
            }
          }
        });
      } catch (error) {
        res.json({
          status: 500,
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

exports.buildAuthorProfile = async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    authorLicense,
    country,
    gender,
    languageOfWriting,
    profileImageUrl
  } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    try {
      const newProfile = new Author({
        userId,
        firstName,
        lastName,
        authorLicense,
        country,
        gender,
        languageOfWriting,
        profileImageUrl
      });

      const response = await newProfile.save();

      try {
        const newVerificationCode = new VerificationCodes({
          accountId: response._id,
        });

        const responseCode = await newVerificationCode.save();

        try {
          let mail = {
            to: `${user.email}`,
            from: `${process.env.GMAIL_USER}`,
            text: `Hello from Bookbase. To activate your account, please click on the following link: http://localhost:5000/user/activate/${responseCode._id}  `,
          };

          await sendMail(mail);

          res.json({
            status: 200,
            message: response,
          });
        } catch (error) {
          res.json({
            status: 500,
            message: error.message,
          });
        }
      } catch (error) {
        res.json({
          status: 500,
          message: error.message,
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error.message,
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

exports.buildReaderProfile = async (req, res) => {
  const { userId, firstName, lastName, country, gender , profileImageUrl} = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    try {
      const newProfile = new Reader({
        userId,
        firstName,
        lastName,
        country,
        gender,
        profileImageUrl
      });

      const response = await newProfile.save();

      try {
        const newVerificationCode = new VerificationCodes({
          accountId: response._id,
        });

        const responseCode = await newVerificationCode.save();

        try {
          let mail = {
            to: `${user.email}`,
            from: `${process.env.GMAIL_USER}`,
            text: `Hello from Bookbase. To activate your account, please click on the following link: http://localhost:5000/user/activate/${responseCode._id}  `,
          };

          await sendMail(mail);

          res.json({
            status: 200,
            message: response,
          });
        } catch (error) {
          res.json({
            status: 500,
            message: error.message,
          });
        }
      } catch (error) {
        res.json({
          status: 500,
          message: error.message,
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error.message,
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

exports.buildPublisherProfile = async (req, res) => {
  const {
    userId,
    name,
    address,
    country,
    federalTaxIdentificationNumber,
    stateTaxRegistrationCertificateNumber,
    profileImageUrl
  } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    try {
      const newProfile = new Publisher({
        userId,
        name,
        address,
        country,
        federalTaxIdentificationNumber,
        stateTaxRegistrationCertificateNumber,
        profileImageUrl
      });

      const response = await newProfile.save();

      try {
        const newVerificationCode = new VerificationCodes({
          accountId: response._id,
        });

        const responseCode = await newVerificationCode.save();

        try {
          let mail = {
            to: `${user.email}`,
            from: `${process.env.GMAIL_USER}`,
            text: `Hello from Bookbase. To activate your account, please click on the following link: http://localhost:5000/user/activate/${responseCode._id}  `,
          };

          await sendMail(mail);

          res.json({
            status: 200,
            message: response,
          });
        } catch (error) {
          res.json({
            status: 500,
            message: error.message,
          });
        }
      } catch (error) {
        res.json({
          status: 500,
          message: error.message,
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error.message,
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await User.findOne({ email: email });

    if (response) {
      try {
        bcrypt.compare(password, response.password, async (err, result) => {
          if (err) {
            res.json({
              status: 400,
              message: err.message,
            });
          } else {
            if (result === true) {


              const token = await generateAccessToken({ email });

              try {
                const readerAccount = await Reader.findOne({userId: response._id})

                if(readerAccount){
                   res.json({
                   status: 200,
                message: {
                  _id: readerAccount._id,
                  userId: readerAccount.userId,
                  firstName: readerAccount.firstName,
                  lastName: readerAccount.lastName,
                  email: response.email,
                  country: readerAccount.country,
                  gender: readerAccount.gender,
                  verified: readerAccount.verified,
                  profileImageUrl: readerAccount.profileImageUrl,
                  token: token,
                  accountType:"Reader"
                },
              });
                }else{
                  try {
                    const authorAccount = await Author.findOne({userId: response._id})
                    
                    if(authorAccount){
                          res.json({
                            status: 200,
                            message: {
                              _id: authorAccount._id,
                              userId: authorAccount.userId,
                              firstName: authorAccount.firstName,
                              lastName: authorAccount.lastName,
                              email: response.email,
                              country: authorAccount.country,
                              gender: authorAccount.gender,
                              verified: authorAccount.verified,
                              profileImageUrl: authorAccount.profileImageUrl,
                              languageOfWriting:authorAccount.profileImageUrl,
                              token: token,
                              accountType:"Author"
                            },
                          });
                    }else{
                      try {
                        const publisherAccount = await Publisher.findOne({userId: response._id})

                        if(publisherAccount){
                             res.json({
                              status: 200,
                              message: {
                                _id: publisherAccount._id,
                              userId: publisherAccount.userId,
                              email: response.email,
                              address:publisherAccount.address,
                              country: publisherAccount.country,
                              federalTaxIdentificationNumber:publisherAccount.federalTaxIdentificationNumber,
                              stateTaxRegistrationCertificateNumber: publisherAccount.stateTaxRegistrationCertificateNumber,
                              verified: publisherAccount.verified,
                              profileImageUrl: publisherAccount.profileImageUrl,
                              token: token,
                              accountType:"Publisher"
                              },
                            });
                        }else{
                          res.json({
                            status:403,
                            message:"Account not found"
                          })
                        }
                      } catch (error) {
                        res.json({
                          status:500,
                          message:error.message
                        })
                      }
                    }
                  } catch (error) {
                    res.json({
                      status:500,
                      message:error.message
                    })
                  }
                }

              } catch (error) {
                res.json({
                  status:500,
                  message:error.message
                })
              }  

              
            } else {
              res.json({
                status: 402,
                message: "Incorrect password",
              });
            }
          }
        });
      } catch (error) {
        res.json({
          status: 500,
          message: error.message,
        });
      }
    } else {
      res.json({
        status: 404,
        message: "User not found.",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

exports.verify = async (req, res) => {
  const { codeId } = req.body;

  try {
    const code = await VerificationCodes.findOne({ _id: codeId });

    if (code) {
      try {
        const readerAccount = await Reader.findOne({ _id: code.accountId });

        if (readerAccount) {
          try {
            const updatedReaderAccount = await Reader.findOneAndUpdate(
              { _id: code.accountId },
              { $set: { verified: true } },
              { new: true }
            );

            try {
              const user = await User.findOne({
                _id: updatedReaderAccount.userId,
              });

              try {
                const token = await generateAccessToken({ email: user.email });

                await VerificationCodes.findOneAndDelete({ _id: codeId });

                res.json({
                  status: 200,
                  message: {
                    account: updatedReaderAccount,
                    token: token,
                  },
                });
              } catch (error) {
                res.json({
                  status: 500,
                  message: error.message,
                });
              }
            } catch (error) {
              res.json({
                status: 500,
                message: error.message,
              });
            }
          } catch (error) {
            res.json({
              status: 500,
              message: error.message,
            });
          }
        } else {
          try {
            const authorAccount = await Author.findOne({ _id: code.accountId });

            if (authorAccount) {
              try {
                const updatedAuthorAccount = await Author.findOneAndUpdate(
                  { _id: code.accountId },
                  { $set: { verified: true } },
                  { new: true }
                );

                try {
                  const user = await User.findOne({
                    _id: updatedAuthorAccount.userId,
                  });

                  try {
                    const token = await generateAccessToken({
                      email: user.email,
                    });

                    await VerificationCodes.findOneAndDelete({ _id: codeId });

                    res.json({
                      status: 200,
                      message: {
                        account: updatedAuthorAccount,
                        token: token,
                      },
                    });
                  } catch (error) {
                    res.json({
                      status: 500,
                      message: error.message,
                    });
                  }
                } catch (error) {
                  res.json({
                    status: 500,
                    message: error.message,
                  });
                }
              } catch (error) {
                res.json({
                  status: 500,
                  message: error.message,
                });
              }
            } else {
              try {
                const publisherAccount = await Publisher.findOne({
                  _id: code.accountId,
                });

                if (publisherAccount) {
                  try {
                    const updatedPublisherAccount =
                      await Publisher.findOneAndUpdate(
                        { _id: code.accountId },
                        { $set: { verified: true } },
                        { new: true }
                      );

                    try {
                      const user = await User.findOne({
                        _id: updatedPublisherAccount.userId,
                      });

                      try {
                        const token = await generateAccessToken({
                          email: user.email,
                        });

                        await VerificationCodes.findOneAndDelete({
                          _id: codeId,
                        });

                        res.json({
                          status: 200,
                          message: {
                            account: updatedPublisherAccount,
                            token: token,
                          },
                        });
                      } catch (error) {
                        res.json({
                          status: 500,
                          message: error.message,
                        });
                      }
                    } catch (error) {
                      res.json({
                        status: 500,
                        message: error.message,
                      });
                    }
                  } catch (error) {
                    res.json({
                      status: 500,
                      message: error.message,
                    });
                  }
                } else {
                  res.json({
                    status: 404,
                    message: "Account not found",
                  });
                }
              } catch (error) {
                res.json({
                  status: 500,
                  message: error.message,
                });
              }
            }
          } catch (error) {
            res.json({
              status: 500,
              message: error.message,
            });
          }
        }
      } catch (error) {
        res.json({
          status: 500,
          message: error.message,
        });
      }
    } else {
      res.json({
        status: 404,
        message: "Invalid user",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

exports.generateForgetPasswordCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.json({
        status: 404,
        message: "User not found",
      });
    } else {
      try {
        const newCode = await ForgetPassword({ userId: user._id });

        const responseCode = await newCode.save();

        let mail = {
          to: `${user.email}`,
          from: `${process.env.GMAIL_USER}`,
          text: `Hello from Bookbase. To reset your account password, please click on the following link: http://localhost:5000/user/reset-password/${responseCode._id}  `,
        };

        await sendMail(mail);

        res.json({
          status: 200,
          message: newCode._id,
        });
      } catch (error) {
        res.json({
          status: 500,
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

exports.checkForgetPasswordCode = async (req, res) => {
  const { codeId } = req.body;

  try {
    const checkCode = await ForgetPasswordCode.findOne({ _id: codeId });

    if (checkCode) {
      res.json({
        status: 200,
      });
    } else {
      res.json({
        status: 402,
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

exports.resetUserPassword = async (req, res) => {
  const { password, codeId } = req.body;

  try {
    const code = await ForgetPassword.findOne({ _id: codeId });

    try {
      const user = await User.findOne({ _id: code.userId });

      try {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (err) {
          } else {
            const updatedUser = await User.findOneAndUpdate(
              { _id: code.userId },
              { $set: { password: hash } },
              { new: true }
            );

            res.json({
              status: 200,
              message: {
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                country: updatedUser.country,
                languageOfWriting: updatedUser.languageOfWriting,
                gender: updatedUser.gender,
                verified: updatedUser.verified,
              },
            });
          }
        });
      } catch (error) {
        res.json({
          status: 500,
          message: error.message,
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error.message,
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};


exports.editReaderProfile = async (req, res) => {

    const {accountId , firstName , lastName , country , gender , profileImageUrl} = req.body;

    try {

      const updatedProfile = await Reader.findOneAndUpdate({_id: accountId} , {$set:{firstName : firstName , lastName:lastName  , country:country , gender:gender , profileImageUrl:profileImageUrl}} , {new: true})
     
      res.json({
        status:200,
        message: updatedProfile
      })

    } catch (error) {

      res.json({
        status:500,
        message: error.message
      })

    }
}


exports.editPublisherProfile = async (req, res) => {

  const {accountId , name , address , country , gender , federalTaxIdentificationNumber , stateTaxRegistrationCertificateNumber , profileImageUrl} = req.body;

  try {

    const updatedProfile = await Publisher.findOneAndUpdate({_id: accountId} , {$set:{name : name , address:address  , country:country , gender:gender ,  federalTaxIdentificationNumber: federalTaxIdentificationNumber , stateTaxRegistrationCertificateNumber:stateTaxRegistrationCertificateNumber , profileImageUrl:profileImageUrl}} , {new: true})
   
    res.json({
      status:200,
      message: updatedProfile
    })

  } catch (error) {

    res.json({
      status:500,
      message: error.message
    })
    
  }
}


exports.editAuthorProfile = async (req, res) => {

  const {accountId , firstName ,lastName, authorLicense , country , gender , languageOfWriting , profileImageUrl} = req.body;

  try {

    const updatedProfile = await Author.findOneAndUpdate({_id: accountId} , {$set:{firstName : firstName , lastName:lastName , authorLicense:authorLicense  , country:country , gender:gender , languageOfWriting:languageOfWriting , profileImageUrl:profileImageUrl}} , {new: true})
   
    res.json({
      status:200,
      message: updatedProfile
    })

  } catch (error) {

    res.json({
      status:500,
      message: error.message
    })
    
  }
}


exports.closeAuthorAccount = async (req,res) =>{
  const { accountId } = req.body;

  try {
    const deletedAccount = await Author.findOneAndDelete({_id: accountId})

    res.json({
      status:200,
      message:"Account successfully deleted"
    })

  } catch (error) {
    
    res.json({
      status:500,
      message: error.message
    })

  }

  
}



exports.closePublisherAccount = async (req,res) =>{

  const { accountId } = req.body;

  try {
    const deletedAccount = await Publisher.findOneAndDelete({_id: accountId})

    res.json({
      status:200,
      message:"Account successfully deleted"
    })

  } catch (error) {
    
    res.json({
      status:500,
      message: error.message
    })

  }

  
}


exports.closeReaderAccount = async (req,res) =>{

  const { accountId } = req.body;

  try {
    const deletedAccount = await Reader.findOneAndDelete({_id: accountId})

    res.json({
      status:200,
      message:"Account successfully deleted"
    })

  } catch (error) {
    
    res.json({
      status:500,
      message: error.message
    })

  }

}



