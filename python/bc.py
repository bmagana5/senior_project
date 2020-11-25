import bcrypt

userpass = b'$2b$14$X2.JDYU06TQEiBv16K0N8emkdblazl.JsuCq9me64RDoCPixGpeJ6'
inputpassword = b"flightlessbirdswhatdotheydreamof"

hashed = bcrypt.hashpw(inputpassword, bcrypt.gensalt(14))

if (bcrypt.checkpw(inputpassword, userpass)):
    print("they match")
else:
    print("they don't match")

print(hashed)