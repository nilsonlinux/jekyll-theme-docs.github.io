---
layout: null
---
/*!
 * @author Natan Felles <natanfelles@gmail.com>
 */
var hello = '    _     _        _ _   _____ _                    ___             \n' +
            ' _ | |___| |___  _| | | |_   _| |_  ___ _ __  ___  |   \\ ___  __ ___\n' +
            '| || / -_) / / || | | |   | | | \' \\/ -_) \'  \\/ -_\) | |) / _ \\/ _(_-<\n' +
            ' \\__/\\___|_\\_\\\\_, |_|_|   |_| |_||_\\___|_|_|_\\___| |___/\\___/\\__/__/\n' +
            '              |__/                                   by @natanfelles';
console.log(hello);
$(document).ready(function() {
    /* Header Links */
    var topics = '';

    function addTopic(level, content) {
        topics += '<a href="#' + content.attr('id') + '" class="list-group-item ' + level + '">' + content.html() + '</a>';
    }

    function headerLinks() {
        $('.post :header').each(function() {
            addTopic(this.tagName, $(this));
            $(this).append('<a class="header-link" href="#' + this.id + '"><i class="fa fa-link"></i></a>');
        });
    }
    headerLinks();
    $('#sidebar #topics').html(topics);

    /* Contact Form */
    $('#contact_form').validator().on('submit', function(e) {
        if ( ! e.isDefaultPrevented()) {
            var alert = $(this).children('.alert');
            $.ajax({
                url: '//formspree.io/{{ site.email }}',
                method: 'POST',
                data: $(this).serialize(),
                dataType: 'json'
            }).done(function(a){
                alert
                    .addClass('alert-success')
                    .html('Sua mensagem foi enviada.')
                    .show();
                $('#contact_form input, #contact_form textarea').each(function(){
                    $(this).val('');
                })
            }).fail(function() {
                alert
                    .addClass('alert-danger')
                    .html('A mensagem não pôde ser enviada agora. Envie um email para {{ site.email }}.')
                    .show();
            });
        }
        return false;
    });

    /* To Top Button */
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 110) {
            $('#toTop').show();
        } else {
            $('#toTop').hide();
        }
    });
    $('#toTop').click(function(e) {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        e.preventDefault();
    });

    if (window.innerWidth > 640) {
        $('#front').css({
            height: window.innerHeight - ($('header').height() + $('footer').height() + 100)
        });
    }


    $('.post img').each(function () {
        $(this).addClass('thumbnail').css({maxWidth: '100%'});
    });

    $('.posts a').each(function () {
        var icon = '<i class="fa fa-arrow-right"></i>';
        if($(this).children('p').length > 0){
            $(this).children('p').append(icon);
        }else{
            $(this).append(icon);
        }
    });

    $('#search-form').submit(function (){
        var search_form = $('#search-form [name="q"]');
        $('#search-modal [name="q"]').val(search_form.val());
        search(search_form.val(), 1);
        search_form.val('');

        return false;
    });

    $('#search-modal').submit(function (){
        search($('#search-modal [name="q"]').val(), 1);

        return false;
    });

    /**
     * Search by Google CSE with API Key
     * @param  {string} query
     * @param  {int} page
     */
    function search(query, page) {

        var searchTerms = query;

        var startIndex = 1;
        if (page > 1) {
            startIndex = page * 10 - 10 + 1;
        }
        console.log(startIndex);

        var cx = $('meta[name="google-cse-cx"]').attr('content');
        var key = $('meta[name="google-api-key"]').attr('content');

        /* https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&cref={cref?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json */
        var url = 'https://www.googleapis.com/customsearch/v1?q=' + searchTerms +
                    '&start=' + startIndex +
                    '&cx=' + cx +
                    '&key=' + key +
                    '&num=10&alt=json';

        $.getJSON(url, function(data,status){
            console.log(data);
            console.log(status);
            if (status == 'success') {
                /**
                 * Results
                 * @type {Array}
                 */
                var results = [];
                $(data.items).each(function(k,v){
                    results[k] = {
                        url: v.link,
                        title: v.title,
                        description: v.snippet
                    };
                });
                var html_results = '';
                $.each(results,function(k,v){
                    html_results += '<a href="' + v.url + '" class="list-group-item">' +
                                    '<h4 class="list-group-item-heading">' + v.title + '</h4>' +
                                    '<p class="list-group-item-text">' + v.description + '</p>' +
                                    '</a>';
                });
                $('.sr-results').html(html_results);

                /**
                 * Benchmark
                 * @type {Object}
                 */
                var benchmark = {
                    count_results: data.searchInformation.totalResults,
                    runtime: data.searchInformation.formattedSearchTime
                };
                $('.sr-benchmark').html(benchmark.count_results + ' results in ' + benchmark.runtime + ' seconds.');

                /**
                 * Pages
                 * @type {Object}
                 */
                var pages = {
                    total: Math.ceil(benchmark.count_results / 10),
                    current: page
                };
                pagination(pages.current, pages.total, query);

            }
        });
    }


    /**
     * Set the html pagination
     * @param {int} current
     * @param {int} total
     * @param {string} query
     */
    function pagination(current, total, query) {
        var p = $('.sr-pages .pagination');

        // Default number of links
        var num_links = 8;
        // But if page is small this is the number of links
        if ($(window).width() < 800) {
            num_links = 2;
        }
        // No necessary pagination
        if (total < 2 || current > total) {
            //console.log('zero pages');
            p.html('');
            return false;
        }
        // Setup the pagination start and end numbers
        var pagination = '';
        var start = (current - num_links > 0) ? current - (num_links - 1) : 1;
        var end = (current + num_links < total) ? current + num_links : total;
        // Previous page link
        if (total > 1 && current > 1) {
            pagination += '<li><a data-page="' + (current - 1) + '">&laquo;</a></li>';
        }
        // Numeric page links
        for (var i = start - 1; i <= end; i++) {
            if (i >= 1) {
                if (current == i) {
                    // current page
                    pagination += '<li class="active"><span>' + current + '</span></li>';
                } else {
                    // other pages
                    pagination += '<li><a data-page="' + i + '">' + i + '</a></li>';
                }
            }
        }
        // Next page link
        if (current < total) {
            pagination += '<li><a data-page="' + (current + 1) + '">&raquo;</a></li>';
        }
        // Ok! Lets set the html
        p.html(pagination);
        // Prepare pagination links to search on click
        p.children().children().click(function () {
            search(query, $(this).attr('data-page'));
            return false;
        });
    }

});

///Nilsonlinux

/******************************************************************************
 * This tutorial is based on the work of Martin Hawksey twitter.com/mhawksey  *
 * But has been simplified and cleaned up to make it more beginner friendly   *
 * All credit still goes to Martin and any issues/complaints/questions to me. *
 ******************************************************************************/

// if you want to store your email server-side (hidden), uncomment the next line
 var TO_ADDRESS = "nilsonlinux@gmail.com";

// spit out all the keys/values from the form in HTML for email
// uses an array of keys if provided or the object to determine field order
function formatMailBody(obj, order) {
  var result = "";
  if (!order) {
    order = Object.keys(obj);
  }
  
  // loop over all keys in the ordered form data
  for (var idx in order) {
    var key = order[idx];
    result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + sanitizeInput(obj[key]) + "</div>";
    // for every key, concatenate an `<h4 />`/`<div />` pairing of the key name and its value, 
    // and append it to the `result` string created at the start.
  }
  return result; // once the looping is done, `result` will be one long string to put in the email body
}

// sanitize content from the user - trust no one 
// ref: https://developers.google.com/apps-script/reference/html/html-output#appendUntrusted(String)
function sanitizeInput(rawInput) {
   var placeholder = HtmlService.createHtmlOutput(" ");
   placeholder.appendUntrusted(rawInput);
  
   return placeholder.getContent();
 }

function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    record_data(e);
    
    // shorter name for form data
    var mailData = e.parameters;

    // names and order of form elements (if set)
    var orderParameter = e.parameters.formDataNameOrder;
    var dataOrder;
    if (orderParameter) {
      dataOrder = JSON.parse(orderParameter);
    }
    
    // determine recepient of the email
    // if you have your email uncommented above, it uses that `TO_ADDRESS`
    // otherwise, it defaults to the email provided by the form's data attribute
    var sendEmailTo = (typeof TO_ADDRESS !== "undefined") ? TO_ADDRESS : mailData.formGoogleSendEmail;
    
    // send email if to address is set
    if (sendEmailTo) {
      MailApp.sendEmail({
        to: String(sendEmailTo),
        subject: "Nova menssagem enviada, de seu Site GitHub ",
        // replyTo: String(mailData.email), // This is optional and reliant on your form actually collecting a field named `email`
        htmlBody: formatMailBody(mailData, dataOrder)
      });
    }

    return ContentService    // return json success results
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * record_data inserts the data received from the html form submission
 * e is the data received from the POST
 */
function record_data(e) {
  var lock = LockService.getDocumentLock();
  lock.waitLock(30000); // hold off up to 30 sec to avoid concurrent writing
  
  try {
    Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it
    
    // select the 'responses' sheet by default
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = e.parameters.formGoogleSheetName || "responses";
    var sheet = doc.getSheetByName(sheetName);
    
    var oldHeader = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var newHeader = oldHeader.slice();
    var fieldsFromForm = getDataColumns(e.parameters);
    var row = [new Date()]; // first element in the row should always be a timestamp
    
    // loop through the header columns
    for (var i = 1; i < oldHeader.length; i++) { // start at 1 to avoid Timestamp column
      var field = oldHeader[i];
      var output = getFieldFromData(field, e.parameters);
      row.push(output);
      
      // mark as stored by removing from form fields
      var formIndex = fieldsFromForm.indexOf(field);
      if (formIndex > -1) {
        fieldsFromForm.splice(formIndex, 1);
      }
    }
    
    // set any new fields in our form
    for (var i = 0; i < fieldsFromForm.length; i++) {
      var field = fieldsFromForm[i];
      var output = getFieldFromData(field, e.parameters);
      row.push(output);
      newHeader.push(field);
    }
    
    // more efficient to set values as [][] array than individually
    var nextRow = sheet.getLastRow() + 1; // get next row
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

    // update header row with any new data
    if (newHeader.length > oldHeader.length) {
      sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
    }
  }
  catch(error) {
    Logger.log(error);
  }
  finally {
    lock.releaseLock();
    return;
  }

}

function getDataColumns(data) {
  return Object.keys(data).filter(function(column) {
    return !(column === 'formDataNameOrder' || column === 'formGoogleSheetName' || column === 'formGoogleSendEmail' || column === 'honeypot');
  });
}

function getFieldFromData(field, data) {
  var values = data[field] || '';
  var output = values.join ? values.join(', ') : values;
  return output;
}
