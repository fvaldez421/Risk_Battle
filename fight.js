$(window).on('load', function () {
    const fightAllBtn = $('#fightAll');
    const fightSingle = $('#fightOnce');
    const clearRes = $('#clearFields');

    const attackInput = $('#attackInput');
    const defenceInput = $('#defenceInput');

    let attackers = -1;
    let defenders = 0;
    let round = 0;

    $('.form').on('submit', function(event) {
        event.preventDefault();
        if (attackers === -1) {
            attackers = parseInt(attackInput.val());
            defenders = parseInt(defenceInput.val());
        }
        fight(attackers, defenders);
    });

    fightAllBtn.on('click', function () {
        console.log('fight-all');
        if (attackers === -1) {
            attackers = parseInt(attackInput.val());
            defenders = parseInt(defenceInput.val());
        } else if (attackers !== attackInput.val()) {
            defenders = parseInt(defenceInput.val());
            attackers = parseInt(attackInput.val());
        }
        fight(attackers, defenders, true);
    });

    fightSingle.on('click', function () {
        console.log('fight-once');
        if (attackers === -1) {
            attackers = parseInt(attackInput.val());
            defenders = parseInt(defenceInput.val());
        }

        fight(attackers, defenders);
    });

    clearRes.on('click', function () {
        clearFields();
        clearRound();
        const progressBar = $('#progressBar');
        progressBar.attr('class', 'progressBar')
        $('#progress').text('');
    });

    function clearFields() {
        console.log('clear fields');
        round = 0;
        $('#rolls').html('');
        $('#remAtt').html('');
        $('#remDef').html('');
    }

    function clearRound() {
        attackInput.val('');
        defenceInput.val('');
        attackers = -1;
    }

    function updateScore(att, def) {
        $('#remAtt').text(attackers);
        $('#remDef').text(defenders);

        const roundRow = `<div id="round_${round}" class="row mb-4"></div>`;
        $('#rolls').append(roundRow);

        const attRow = `<div id="att_${round}" class="clear ml-3 mb-2"></div>`;
        const defRow = `<div id="def_${round}" class="clear ml-3"></div>`;

        $(`#round_${round}`).append(attRow).append(defRow);

        for (let i = att.length - 1; i >= 0; i--) {
            const dice = $('<div></div>');
            dice.attr('id', `dice_${i}`)
                .attr('class', 'dice red float-left mr-2')
                .text(att[i]);
            $(`#att_${round}`).prepend(dice);
        }
        for (let i = def.length - 1; i >= 0; i--) {
            const dice = $('<div></div>');
            dice.attr('id', `dice_${i}`)
                .attr('class', 'dice white float-left mr-2')
                .text(def[i]);
            $(`#def_${round}`).prepend(dice);
        }

        if (attackers === 0 || defenders === 0) {
            const progressBar = $('#progressBar');
            progressBar.attr('class', 'progressBar green')
            $('#progress').text('Done!');
        }
        attackInput.val(attackers);
        defenceInput.val(defenders);
    }

    function getRand() {
        const rand = Math.floor((Math.random() * 6) + 1);
        return rand;
    };

    function compare(att, def) {
        let len;
        if (att.length > def.length) {
            len = def.length;
        } else if (def.length > att.length) {
            len = att.length;
        } else {
            len = att.length;
        }

        for (let i = 0; i < len; i++) {
            if (att[i] > def[i]) {
                defenders--;
            } else {
                attackers--;
            }
        }

        updateScore(att, def);
        console.log(att);
        console.log(def);
        console.log(attackers, defenders);
    };

    function fight(att, def, recurs = false) {
        round++;
        const attRoll = [];
        const defRoll = [];

        if (att > 0 && def > 0) {
            let i;
            let y;

            if (att > 3) {
                i = 3;
            } else {
                i = att;
            }
            for (; i > 0; i--) {
                const die = getRand();
                attRoll.push(die);
            }

            if (def > 2) {
                y = 2;
            } else {
                y = def;
            }
            for (; y > 0; y--) {
                const die = getRand();
                defRoll.push(die);
            }
            attRoll.sort((a, b) => a < b);
            defRoll.sort((a, b) => a < b);

            compare(attRoll, defRoll);

        } else {
            console.log('err:', att, def);
        }

        if (recurs && attackers > 0 && defenders > 0) {
            fight(attackers, defenders, true);
        } else {
            console.log('done');
        }
    };



});