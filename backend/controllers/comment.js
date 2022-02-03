const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Comment = require('../models/Comment');
const fs = require('fs');
