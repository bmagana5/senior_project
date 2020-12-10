CREATE OR REPLACE FUNCTION ins_post(_post_body TEXT) RETURNS void AS 
$$
    BEGIN	
        INSERT INTO post(post_body) VALUES (_post_body);
    END;
$$ LANGUAGE plpgsql;