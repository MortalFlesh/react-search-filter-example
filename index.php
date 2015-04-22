<?php

$selectedType = isset($_GET['type']) ? (int)$_GET['type'] : 0;
$selectedMaterial = isset($_GET['material']) ? (int)$_GET['material'] : 0;

function getApiData($url, $key) {
    $json = file_get_contents($url);
    $data = json_decode($json, true);
    return array_key_exists($key, $data) ? $data[$key] : $data;
}

$types = getApiData('./api/types.json', 'types');
$materials = getApiData('./api/materials.json', 'materials');
$items = getApiData('./api/items.json', 'items');

$filteredItems = array_filter($items, function($item) use ($selectedType, $selectedMaterial) {
    if ($selectedType === 0 && $selectedMaterial === 0) {
        return true;
    } elseif ($selectedType > 0 && $selectedMaterial > 0) {
        return ($selectedType === $item['type'] && $selectedMaterial === $item['material']);
    } elseif ($selectedType > 0 && $item['type'] === $selectedType) {
        return true;
    } elseif ($selectedMaterial > 0 && $item['material'] === $selectedMaterial) {
        return true;
    }

    return false;
});

$url = 'index.php';

function renderSeoLinks($valueKeyName, $filterValues, $anotherFilterKeyName, $selectedValueOfAnotherFilter, $anotherFilterValues) {
    $typeText = [];
    if ($selectedValueOfAnotherFilter > 0) {
        $typeText[] = $anotherFilterValues[$selectedValueOfAnotherFilter]['name'];
    }

    $typeLink = [];
    if ($selectedValueOfAnotherFilter > 0) {
        $typeLink[] = $anotherFilterKeyName . '=' . $anotherFilterValues[$selectedValueOfAnotherFilter]['id'];
    }


    foreach($filterValues as $value) {
        $text = $value['name'];
        $linkUrl = $valueKeyName . '=' . $value['id'];

        if ($selectedValueOfAnotherFilter > 0) {
            $text .= ' ' . implode(' ', $typeText);
            $linkUrl .= '&' . implode('&', $typeLink);
        }

        renderLink($text, $linkUrl);
    }
}

function renderLink($text, $url) {
    ?><a href="index.php?<?php echo $url?>"><?php echo $text ?></a><br><?php
}

/**
 * todo - zvazit, jestli tam ty selecty a form vubec byt musi
 */

?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Search filter example</title>
</head>
<body>
    <div id="search-filter">
        <form id="filter-form" method="get" action="<?php echo $url?>">

            Typ:
            <select name="type" onchange="document.getElementById('filter-form').submit()">
                <option value="0">typ</option>
                <?php
                foreach($types as $type) {
                    $selected = $selectedType === $type['id'];
                    ?><option value="<?php echo $type['id']?>"<?php echo $selected ? " selected='selected'" : '' ?>>
                        <?php echo $type['name']?>
                    </option><?php
                }
                ?>
            </select>

            <br>

            Materiál:
            <select name="material" onchange="document.getElementById('filter-form').submit()">
                <option value="0">materiál</option>
                <?php
                foreach($materials as $material) {
                    $selected = $selectedMaterial === $material['id'];
                    ?><option value="<?php echo $material['id']?>"<?php echo $selected ? " selected='selected'" : '' ?>>
                        <?php echo $material['name']?>
                    </option><?php
                }
                ?>
            </select>
        </form>
    </div>
    <script type="text/javascript" src="./cache/index.min.js"></script>

    <div>
        <?php
        renderSeoLinks('type', $types, 'material', $selectedMaterial, $materials);
        renderSeoLinks('material', $materials, 'type', $selectedType, $types);
        ?>
    </div>

    <div>
        <ul>
            <?php
            if (count($filteredItems) <= 0) {
                ?><li>Nic nenalezeno</li><?php
            }
            foreach($filteredItems as $item) {
                ?><li><?php echo implode(' | ', $item)?></li><?php
            }
            ?>
        </ul>
    </div>
</body>
</html>