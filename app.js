$(function () {

    var orderul = $('#orderlists');
    var addName = $('#name');
    var addOrder = $('#order');
    var addQuantity = $('#quantity');
    var addAddress = $('#address');
    
    //get all orderlists

    $.get('/orderlists/manageRequest.php', {makeRequest: 'get'}, function(orderLists) {
        $.each(orderLists, function(index, orderlist) {
            
            listOrder(orderlist, orderlist.id);

        });

    }, 'json');

    //add orderlists
    $('#addBtn').on('click', function() {
        var addOrderList = {makeRequest: 'add', name: addName.val(), order_name: addOrder.val(), quantity: addQuantity.val(), address: addAddress.val()};
    
        $.post('/orderlists/manageRequest.php', addOrderList, function(addListId) {
            
            listOrder(addOrderList, addListId);
        })
       });

    
    //lists
    function listOrder(order, dataId) {
        var orderli = $('<li>');

        //<p> for noedit
        var p1 = $('<p>', {
            'class' : 'noedit'
        });
        var p2 = $('<p>', {
            'class' : 'noedit'
        });
        var p3 = $('<p>', {
            'class' : 'noedit'
        });
        var p4 = $('<p>', {
            'class' : 'noedit'
        });

            var sname = $('<strong>').html('Name : ');
            var snameValue = $('<span>', {
                'id': 'span-name'
            }).html(order.name);  
            var sorder = $('<strong>').html('Order : ');
            var sorderValue = $('<span>', {
                'id': 'span-order'
            }).html(order.order_name);  
            var squantity = $('<strong>').html('Quantity : ');
            var squantityValue = $('<span>', {
                'id': 'span-quantity'
            }).html(order.quantity);  
            var saddress = $('<strong>').html('Address : ');
            var saddressValue = $('<span>', {
                'id' : 'span-address'
            }).html(order.address);  

            // start edit mode
            //<p> for edit
            var editp1 = $('<p>', {
                'class' : 'edit'
           });
           var editp2 = $('<p>', {
                'class' : 'edit'
           });
           var editp3 = $('<p>', {
                'class' : 'edit'
           });
           var editp4 = $('<p>', {
                'class' : 'edit'
           });

           var lb1 = $('<label>', {
               'for': 'name'
           }).html('Name : ');
           var lb2 = $('<label>', {
               'for': 'order'
           }).html('Order : ');
           var lb3 = $('<label>', {
               'for': 'quantity'
           }).html('Quantity : ');
           var lb4 = $('<label>', {
               'for': 'address'
           }).html('Address : ');

           var in1 = $('<input>', {
               'type': 'text',
               'name': 'name',
               'id' : 'editname'
           })
           var in2 = $('<input>', {
               'type': 'text',
               'name': 'order',
               'id' : 'editorder'
           })
           var in3 = $('<input>', {
               'type': 'text',
               'name': 'quantity',
               'id' : 'editquantity'
           })
           var in4 = $('<input>', {
               'type': 'text',
               'name': 'address',
               'id' : 'editaddress'
           })

           //<p> <label> </label> <input> </p> for edit mode
           var forEdit1 = editp1.append(lb1).append(in1);
           var forEdit2 = editp2.append(lb2).append(in2);
           var forEdit3 = editp3.append(lb3).append(in3);
           var forEdit4 = editp4.append(lb4).append(in4);
            //end edit mode

            //<p> <strong> </strong> <span> </span> </p>      
            var pa1 = p1.append(sname).append(snameValue); 
            var pa2 = p2.append(sorder).append(sorderValue); 
            var pa3 = p3.append(squantity).append(squantityValue); 
            var pa4 = p4.append(saddress).append(saddressValue); 

            //start Edit Button 
            var editBtn = $('<button>', {
                'id' : 'editBtn',
                'class' : 'noedit'
            }).html('Edit').on('click', function() {
                $(this).closest('li').addClass('edit');
                var li = $(this).closest('li');
                in1.attr('value', li.find('#span-name').html());
                in2.attr('value', li.find('#span-order').html());
                in3.attr('value', li.find('#span-quantity').html());
                in4.attr('value', li.find('#span-address').html());
            });


            //Update Button
            var saveBtn = $('<button>', {
                'id' : 'saveBtn',
                'class' : 'edit'
            }).html('Save').on('click', function() {
                var save = $(this).closest('li');
                var upname = save.find('#editname').val();
                var uporder = save.find('#editorder').val();
                var upquantity = parseInt(save.find('#editquantity').val());
                var upaddress = save.find('#editaddress').val();
                var updateOrderList = {makeRequest: 'update', upName: upname, upOrder: uporder, upQuantity: upquantity, upAddress: upaddress ,id: dataId}
                $.post('/orderlists/manageRequest.php', updateOrderList, function(upId) {
                    save.find('#span-name').html(upname);
                    save.find('#span-order').html(uporder);
                    save.find('#span-quantity').html(upquantity);
                    save.find('#span-address').html(upaddress);
                    save.removeClass('edit');
                })
            });

            //Edit Cancel Button
            var cancelBtn = $('<button>', {
                'id' : 'canBtn',
                'class' : 'edit'
            }).html('Cancel').on('click', function() {
                $(this).closest('li').removeClass('edit');
            });
            //end Edit Button

            //Delete button
            var deleteBtn = $('<button>', {
                'id' : 'delBtn',
                'class' : 'noedit'
            }).html('Delete').on('click', function() {
                var a = $(this).closest('li'); 
                $.post('/orderlists/manageRequest.php', {makeRequest: 'delete', id: dataId}, function(dc) {
                   a.remove();
                })
            });


            //before create edit mode
            //<li> <p> <strong> </strong> <span> </span> </p> </li>
            // var addli = orderli.append(pa1).append(pa2).append(pa3).append(pa4);

            //after create edit mode
            //<li> 'for-noedit' <p> <strong> </strong> <span> </span> </p>
            //'for-edit' <p> <label> </label> <input> </p>
            //<div> buttons group </div> </li>
            var addli = orderli.append(pa1).append(pa2).append(pa3).append(pa4).append(forEdit1).append(forEdit2).append(forEdit3).append(forEdit4).append(editBtn).append(cancelBtn).append(saveBtn).append(deleteBtn);

             //<ul> <li> ***** </li> </ul>
            orderul.append(addli);

            

    }
})