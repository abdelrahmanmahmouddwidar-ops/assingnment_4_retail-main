CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '123456';

GRANT SELECT, INSERT, UPDATE
ON retail.*
TO 'store_manager'@'localhost';

REVOKE UPDATE
ON retail.*
FROM 'store_manager'@'localhost';

GRANT DELETE
ON retail.Sales
TO 'store_manager'@'localhost';

FLUSH PRIVILEGES; 