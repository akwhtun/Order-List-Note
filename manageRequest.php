<?php

$db = new PDO('mysql:dbhost=localhsot;dbname=list', 'root', '', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
]);

$getRequest = $_REQUEST['makeRequest'];

switch ($getRequest) {
    case 'get':
       getAllLists();
        break;
    case 'add':
        addList();
        break;
    case 'update':
        updateList();
        break;
    case 'delete':
        deleteList();
        break;
    default:
        unknownList();
        break;
}

function getAllLists() {
    global $db;
    $allLists = $db->query("SELECT * FROM order_lists");
    $result = $allLists->fetchAll();
    if($result){
        print_r(json_encode($result));
    }else {
        print_r(array('msg' => 'cannot get lists'));
    }
};

function addList() {
    global $db;

    $add = "INSERT INTO order_lists (name, order_name, quantity, address, created_at) VALUES (:name, :order_name, :quantity, :address, NOW())";
    $addList = $db->prepare($add);
    $addList->execute([
        ':name' => 'Kyaw Gyi',
        ':order_name'=> 'laptop',
        ':quantity' => 2,
        ':address' => '5th street Main Road'
    ]);
    $addResult = $db->lastInsertId();
    if($addResult) {
        print_r($addResult);
    }else {
        print_r(array('msg' => 'cannot add list'));
    }
};

function updateList() {
    global $db;
    $update = "UPDATE order_lists SET name=:name, order_name =:order_name,   quantity=:quantity, address=:address, updated_at=NOW() WHERE id=7";
    $updateList = $db->prepare($update);
    $updateList->execute([
        ':name' => 'Kyaw Lay',
        ':order_name' => 'Desktop',
        'quantity' => 5,
        'address' => '123 main road',
    ]);
    $updatResult = $updateList->rowCount();;
    if($updatResult) {
        print_r($updatResult);
    }else {
        print_r(array('msg' => 'cannot update list'));
    }
};

function deleteList() {
    global $db;

    $delete = "DELETE FROM order_lists WHERE id=8";
    $deleteList = $db->prepare($delete);
    $deleteList->execute();
    $deleteResult = $deleteList->rowCount();;
    if($deleteResult) {
        print_r($deleteResult);
    }else {
        print_r(array('msg' => 'cannot delete list'));
    }
};

function unknownList() {
 print_r(array('msg' => 'unknown request'));
}

   
