from hashlib import sha256

password = 'dontpwnme4'
h = sha256()                        # create secure hashing algorithm object
h.update(password.encode('utf-8'))  # encode password into bytes
hash = h.hexdigest()                # return the the 256 bit hash string in hex form (64 hex char output)
print(hash)