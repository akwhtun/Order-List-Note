$(function () {

    var orderul = $('#orderlists');
    var doneul = $('#donelists');
    var priul = $('#prioritylists');
    var addName = $('#name');
    var addOrder = $('#order');
    var addQuantity = $('#quantity');
    var addAddress = $('#address');

    //get all orderlists

    $.get('/orderlists/manageRequest.php', {makeRequest: 'get'}, function(orderLists) {
        $.each(orderLists, function(index, orderlist) {
            if(orderlist.done != 1 && orderlist.priority < 1) {
                listOrder(orderlist, orderlist.id);
            }
            if(orderlist.priority > 0 && orderlist.done != 1) {
                var getli = listOrder(orderlist, orderlist.id);
                    priul.addClass('priority');
                    priul.append(getli);
                var getpri = getli.attr('data-priority');
                if(getpri == 1){
                    getli.find('i').eq('0').removeClass('far fa-star se').addClass('fas fa-star-half-alt sh');
                }
                if(getpri == 2){
                    getli.find('i').eq('0').removeClass('far fa-star se').removeClass('fas fa-star-half-alt sh').addClass('fas fa-star sf');
                }
                if(getpri == 3){
                    getli.find('i').eq('0').removeClass('far fa-star se').addClass('fas fa-star sf');
                    getli.find('i').eq('1').removeClass('far fa-star se').addClass('fas fa-star-half-alt sh');
                }
                if(getpri == 4){
                    getli.find('i').eq('0').removeClass('far fa-star se').addClass('fas fa-star sf');
                    getli.find('i').eq('1').removeClass('far fa-star se').removeClass('fas fa-star-half-alt sh').addClass('fas fa-star sf');
                }
                if(getpri == 5){
                    getli.find('i').eq('0').removeClass('far fa-star se').addClass('fas fa-star sf');
                    getli.find('i').eq('1').removeClass('far fa-star se').addClass('fas fa-star sf');
                    getli.find('i').eq('2').removeClass('far fa-star se').addClass('fas fa-star-half-alt sh');
                }
                if(getpri == 6){
                    getli.find('i').eq('0').removeClass('far fa-star se').addClass('fas fa-star sf');
                    getli.find('i').eq('1').removeClass('far fa-star se').addClass('fas fa-star sf');
                    getli.find('i').eq('2').removeClass('far fa-star se').removeClass('fas fa-star-half-alt sh').addClass('fas fa-star sf');
                }
            }
            if(orderlist.done == 1){
                doneOrderLists(orderlist, orderlist.id);
            }
        });

    }, 'json');

    //add orderlists
    var require = $('#addBtn').parent().find('p');
        addName.keydown(function() {
            require.eq(0).removeClass('rq');
        });
        addOrder.keydown(function() {
            require.eq(1).removeClass('rq');
        });
        addAddress.keydown(function() {
            require.eq(2).removeClass('rq');
        });

    $('#addBtn').on('click', function() {
        if(!addName.val()){
            require.eq(0).addClass('rq');
            return
        }

        if(!addOrder.val()){
            require.eq(1).addClass('rq');
            return
        }
        if(!addAddress.val()){
            require.eq(2).addClass('rq');
            return
        }

        var addOrderList = {makeRequest: 'add', name: addName.val(), order_name: addOrder.val(), quantity: addQuantity.val(), address: addAddress.val(), priority: 0};
        $.post('/orderlists/manageRequest.php', addOrderList, function(addListId) {
            
            listOrder(addOrderList, addListId);
    });
        addName.val('');
        addOrder.val('');
        addAddress.val('');
    });

    //lists
    function listOrder(order, dataId) {
        var orderli = $('<li>', {
            'data-id': dataId,
            'data-priority': order.priority,
        });

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
        
        //<p> <strong> </strong> <span> </span> </p>      
        var pa1 = p1.append(sname).append(snameValue); 
        var pa2 = p2.append(sorder).append(sorderValue); 
        var pa3 = p3.append(squantity).append(squantityValue); 
        var pa4 = p4.append(saddress).append(saddressValue);

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
            'type': 'number',
            'min': '1',
            'max': '100',
            'name': 'quantity',
            'id' : 'editquantity'
        })
        var in4 = $('<textarea>', {
            'rows': '2',
            'cols': '25',
            'name': 'address',
            'id' : 'editaddress'
        })

        //<p> <label> </label> <input> </p> for edit mode
        var forEdit1 = editp1.append(lb1).append(in1);
        var forEdit2 = editp2.append(lb2).append(in2);
        var forEdit3 = editp3.append(lb3).append(in3);
        var forEdit4 = editp4.append(lb4).append(in4);
        //end edit mode 

        //start Edit Button 
        var editBtn = $('<button>', {
            'id' : 'editBtn',
            'class' : 'noedit'
        }).html('Edit');

        //Update Button
        var saveBtn = $('<button>', {
            'id' : 'saveBtn',
            'class' : 'edit'
        }).html('Save');

        //Edit Cancel Button
        var cancelBtn = $('<button>', {
            'id' : 'canBtn',
            'class' : 'edit'
        }).html('Cancel');

        //end Edit Button

        //Delete button
        var deleteBtn = $('<button>', {
            'id' : 'delBtn',
            'class' : 'noedit'
        }).html('Delete');

        //Done Button
        var done = $('<button>',{
            'id': 'doneBtn',
        }).html('Done');

        //icons 
        var icon1 = $('<i>', {
            'class': 'far fa-star star se',
            'id': 'star1'
        })
        var icon2 = $('<i>', {
            'class': 'far fa-star star se',
            'id': 'star2'
        })
        var icon3 = $('<i>', {
            'class': 'far fa-star star se',
            'id': 'star3'
        })

        //before create edit mode
        //<li> <p> <strong> </strong> <span> </span> </p> </li>
        // var addli = orderli.append(pa1).append(pa2).append(pa3).append(pa4);

        //after create edit mode
        //<li> 'for-noedit' <p> <strong> </strong> <span> </span> </p>
        //'for-edit' <p> <label> </label> <input> </p>
        //<div> buttons group </div> </li>
        var addli = orderli.append(pa1).append(pa2).append(pa3).append(pa4).append(forEdit1).append(forEdit2).append(forEdit3).append(forEdit4).append(editBtn).append(cancelBtn).append(saveBtn).append(deleteBtn).append(done).append(icon1).append(icon2).append(icon3);

            //<ul> <li> ***** </li> </ul>
        orderul.append(addli);
        return orderli;
}
    //Done Undo Mode
   function doneAll(doul){
    doul.delegate('#doneBtn','click', function() {
        var doneId = $(this).closest('li').attr('data-id');
        var pri = $(this).closest('li').attr('data-priority');
        var get = $(this).closest('li');
       $.post('/orderlists/manageRequest.php', {makeRequest:'done', id: doneId }, function(di){
        var getDoneName = get.find('#span-name').html();
        var getDoneOrder = get.find('#span-order').html();
        var getDoneQuantity = get.find('#span-quantity').html();
        var getDoneAddress = get.find('#span-address').html();
        var doneObj = {name: getDoneName, order_name: getDoneOrder, quantity: getDoneQuantity, address: getDoneAddress, pri: pri};
        doneOrderLists(doneObj, doneId );
        get.remove();
    });
    });
   }
   doneAll(orderul);
   doneAll(priul);

    //done lists
    function doneOrderLists(doneList, done){
        var li = $('<li>', {
            'data-id': done,
            'id' : 'doneli',
            'data-priority': doneList.pri
        });

         //<p> for done
        var p1 = $('<p>');
        var p2 = $('<p>');
        var p3 = $('<p>');
        var p4 = $('<p>');

        var sname = $('<strong>').html('Name : ');
        var snameValue = $('<span>', {
            'id': 'span-name'
        }).html(doneList.name);  
        var sorder = $('<strong>').html('Order : ');
        var sorderValue = $('<span>', {
            'id': 'span-order'
        }).html(doneList.order_name);  
        var squantity = $('<strong>').html('Quantity : ');
        var squantityValue = $('<span>', {
            'id': 'span-quantity'
        }).html(doneList.quantity);  
        var saddress = $('<strong>').html('Address : ');
        var saddressValue = $('<span>', {
            'id' : 'span-address'
        }).html(doneList.address); 
        
        //<p> <strong> </strong> <span> </span> </p>      
        var pa1 = p1.append(sname).append(snameValue); 
        var pa2 = p2.append(sorder).append(sorderValue); 
        var pa3 = p3.append(squantity).append(squantityValue); 
        var pa4 = p4.append(saddress).append(saddressValue);

        //done delete button
        var del = $('<button>', {
            'class': 'del',
            'id' : 'delBtn'
        }).html('Delete')
        
        //undo button
        var undo = $('<button>', {
            'id' : 'undo'
        }).html('Undo');

        var doneli = li.append(pa1).append(pa2).append(pa3).append(pa4).append(del).append(undo);

        doneul.append(doneli);

    };

    //Undo Btn
    doneul.delegate('#undo','click', function() {
        var undoList = $(this).closest('li');
        var unid = undoList.attr('data-id');
        $.post('/orderlists/manageRequest.php', {makeRequest: 'undone', id: unid}, function(uc) {
        var getUndoneName = undoList.find('#span-name').html();
        var getUndoneOrder = undoList.find('#span-order').html();
        var getUndoneQuantity = undoList.find('#span-quantity').html();
        var getUndoneAddress = undoList.find('#span-address').html();
    var undoneObj = {name: getUndoneName, order_name: getUndoneOrder, quantity: getUndoneQuantity, address: getUndoneAddress, priority: 0};
            listOrder(undoneObj, unid);
            undoList.remove();

        })
    })


    //priority
    orderul.delegate('.se', 'click', function() {
        priul.addClass('priority');
        var getli = $(this).closest('li');
        var priId = $(this).closest('li').attr('data-id');
        var ptask = parseInt($(this).closest('li').attr('data-priority'));
        ++ptask;
        $(this).closest('li').attr('data-priority', ptask);
        $(this).removeClass('far fa-star se').addClass('fas fa-star-half-alt sh');
        $.post('/orderlists/manageRequest.php', {makeRequest: 'priority', id: priId, prinum: ptask}, function(pi) {
            getli.clone().prependTo(priul);
            
            getli.remove();
        })
    })

    
    priul.delegate('.se', 'click', function() {
        // priul.addClass('priority');
        var getli = $(this).closest('li');
        var priId = $(this).closest('li').attr('data-id');
        var ptask = parseInt($(this).closest('li').attr('data-priority'));
        ++ptask;
        $(this).closest('li').attr('data-priority', ptask);
        $(this).removeClass('far fa-star se').addClass('fas fa-star-half-alt sh');
        $.post('/orderlists/manageRequest.php', {makeRequest: 'priority', id: priId, prinum: ptask}, function(pi) {
        })
    })

    priul.delegate('.sh','click',  function() {
        var priId = $(this).closest('li').attr('data-id');
        var ptask = parseInt($(this).closest('li').attr('data-priority'));
        ++ptask;
        $(this).closest('li').attr('data-priority', ptask);
        $(this).removeClass('fas fa-star-half-alt sh').addClass('fas fa-star sf');
        $.post('/orderlists/manageRequest.php', {makeRequest: 'priority', id: priId, prinum: ptask}, function(pi) {
    
        })
    })

    priul.delegate('.sf','click',  function() {
        var cli = $(this).closest('li');
        var priId = $(this).closest('li').attr('data-id');
        var ptask = parseInt($(this).closest('li').attr('data-priority'));
        var pp = ptask - 2;
        $(this).closest('li').attr('data-priority', pp);
        $(this).removeClass('fas fa-star sf').addClass('far fa-star se');
        $.post('/orderlists/manageRequest.php', {makeRequest: 'priority', id: priId, prinum: pp}, function(pi) {
            if(pp != 0){
                return
            }else {
                cli.clone().prependTo(orderul);
                cli.remove();
            };
            if($('#prioritylists').find('li').eq('0').is('li')){
                return
            }else{
                priul.removeClass('priority');   
            }
        });
    })

    //Edit Mode
    //Edit Button
    function editAll(eul){
        eul.delegate('#editBtn','click', function() {
            var li = $(this).closest('li');
            li.addClass('edit');
            li.find('#editname').attr('value', li.find('#span-name').html());
            li.find('#editorder').attr('value', li.find('#span-order').html());
            li.find('#editquantity').attr('value', li.find('#span-quantity').html());
            li.find('#editaddress').html(li.find('#span-address').html())
        });
    };
    editAll(orderul);
    editAll(doneul);
    editAll(priul);

//Update Button
   function updateAll(uul){
    uul.delegate('#saveBtn','click', function() {
        var save = $(this).closest('li');
        var sid = $(this).closest('li').attr('data-id');
        var upname = save.find('#editname').val();
        var uporder = save.find('#editorder').val();
        var upquantity = parseInt(save.find('#editquantity').val());
        var upaddress = save.find('#editaddress').val();
        var updateOrderList = {makeRequest: 'update', upName: upname, upOrder: uporder, upQuantity: upquantity, upAddress: upaddress ,id: sid}
        $.post('/orderlists/manageRequest.php', updateOrderList, function(upId) {
            save.find('#span-name').html(upname);
            save.find('#span-order').html(uporder);
            save.find('#span-quantity').html(upquantity);
            save.find('#span-address').html(upaddress);
            save.removeClass('edit');
        })
    });
   };
   updateAll(orderul);
   updateAll(doneul);
   updateAll(priul);

    //Edit Cancel Button
    function cancelAll(cul) {
        cul.delegate('#canBtn','click', function() {
            $(this).closest('li').removeClass('edit');
        });
    }
    cancelAll(orderul);
    cancelAll(doneul);
    cancelAll(priul);

////End Edit

//Delete Mode
   function deleteAll(dul){
    dul.delegate('#delBtn','click', function() {
        var a = $(this).closest('li'); 
        var did = a.attr('data-id');
        $.post('/orderlists/manageRequest.php', {makeRequest: 'delete', id: did}, function(dc) {
            a.fadeOut(200, function() {
                $(this).remove();
            });
        })
    });
   }
   deleteAll(orderul);
   deleteAll(doneul);
   deleteAll(priul);

})