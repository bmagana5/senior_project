import bcrypt
import sys

# password = sys.argv[1]

hashed = bcrypt.hashpw(sys.argv[1].encode('utf-8'), bcrypt.gensalt(14))

# if (bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))):
    # print("they match")

print(hashed.decode('utf-8'))