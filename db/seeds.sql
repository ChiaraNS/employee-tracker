INSERT INTO department (name)
VALUES
    ("Gryffindor"),
    ("Hufflepuff"),
    ("Ravenclaw"),
    ("Slytherin");

INSERT INTO role (title, salary, department_id)
VALUES   
    ("Transfiguration", 5000, 1),
    ("Herbology", 10000, 2),
    ("Charms", 150000, 3),
    ("Potions", 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Minerva", "McGonagall", 1, 2),
    ("Pomona", "Sprout", 4, 3),
    ("Filius", "Flitwick", 2, 4),
    ("Severus", "Snape", 3, NULL);
